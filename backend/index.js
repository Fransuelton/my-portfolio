import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import process from "process";

// Importar serviços
import {
  sendContactEmail,
  testEmailConnection,
} from "./services/emailService.js";
import {
  contactValidationRules,
  handleValidationErrors,
  sanitizeContactData,
} from "./middleware/validation.js";

// Configurar variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configurações de segurança
app.use(helmet());

// Configurar CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Accept"],
  })
);

// Middleware para parsing JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting - limitar tentativas de envio de email
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas por IP
  message: {
    success: false,
    message: "Muitas tentativas de envio. Tente novamente em 15 minutos.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rotas
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "API do Portfolio funcionando!",
    version: "1.0.0",
  });
});

// Rota para testar configuração de email
app.get("/api/email/test", async (req, res) => {
  try {
    let result;

    result = await testEmailConnection();

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao testar configuração de email",
    });
  }
});

// Rota para envio de email de contato
app.post(
  "/api/contact",
  emailLimiter,
  contactValidationRules,
  handleValidationErrors,
  sanitizeContactData,
  async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // Log da tentativa (sem dados sensíveis)
      console.log(
        `[${new Date().toISOString()}] Nova tentativa de contato de: ${email}`
      );

      let result;

      result = await sendContactEmail({ name, email, message });

      res.status(200).json({
        success: true,
        message: "Mensagem enviada com sucesso! Retornarei em breve.",
        data: {
          messageId: result.messageId,
        },
      });
    } catch (error) {
      console.error("Erro no envio de email:", error);

      res.status(500).json({
        success: false,
        message: "Erro interno do servidor. Tente novamente mais tarde.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
);

// Middleware de tratamento de erros global
app.use((err, req, res) => {
  console.error("Erro não tratado:", err);

  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📧 Sistema de email configurado`);
  console.log(`🔒 CORS configurado para: ${process.env.CORS_ORIGIN}`);
});
