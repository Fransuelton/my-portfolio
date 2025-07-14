import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

/**
 * Configuração do transportador de email
 * Usando Gmail como provedor (pode ser alterado conforme necessidade)
 */
const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT);
  const isSecure = port === 465;
  const isHostinger = process.env.EMAIL_HOST.includes('hostinger');
  
  console.log('📧 Configuração do transporter:');
  console.log(`   Host: ${process.env.EMAIL_HOST}`);
  console.log(`   Port: ${port}`);
  console.log(`   Secure: ${isSecure}`);
  console.log(`   User: ${process.env.EMAIL_USER}`);
  console.log(`   Provider: ${isHostinger ? 'Hostinger' : 'Gmail'}`);
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: port,
    secure: isSecure, // true para porta 465, false para porta 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false // Para desenvolvimento
    },
    // Configurações específicas para Hostinger
    ...(isHostinger && {
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    })
  });
};

/**
 * Função para enviar email de contato
 * @param {Object} formData - Dados do formulário
 * @param {string} formData.name - Nome do remetente
 * @param {string} formData.email - Email do remetente
 * @param {string} formData.message - Mensagem
 */
export const sendContactEmail = async (formData) => {
  const { name, email, message } = formData;
  
  const transporter = createTransporter();
  
  // Template do email
  const mailOptions = {
    from: {
      name: 'Portfolio Contact Form',
      address: process.env.EMAIL_FROM
    },
    to: process.env.EMAIL_TO,
    subject: `Nova mensagem de contato - ${name}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Nova Mensagem de Contato
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Mensagem:</h3>
          <p style="line-height: 1.6; color: #555;">${message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f1f1; border-radius: 8px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            Esta mensagem foi enviada através do formulário de contato do seu portfolio.
          </p>
        </div>
      </div>
    `,
    text: `
      Nova mensagem de contato
      
      Nome: ${name}
      Email: ${email}
      Data: ${new Date().toLocaleString('pt-BR')}
      
      Mensagem:
      ${message}
    `
  };
  
  // Email de confirmação para o remetente
  const confirmationOptions = {
    from: {
      name: 'Fransuelton - Portfolio',
      address: process.env.EMAIL_FROM
    },
    to: email,
    subject: 'Obrigado pelo seu contato!',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Olá, ${name}!</h2>
        
        <p style="line-height: 1.6; color: #555;">
          Obrigado por entrar em contato comigo através do meu portfolio. 
          Recebi sua mensagem e retornarei o mais breve possível.
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Sua mensagem:</h3>
          <p style="line-height: 1.6; color: #555; font-style: italic;">"${message}"</p>
        </div>
        
        <p style="line-height: 1.6; color: #555;">
          Atenciosamente,<br>
          <strong>Fransuelton</strong>
        </p>
      </div>
    `
  };
  
  try {
    // Verificar conexão
    await transporter.verify();
    
    // Enviar email principal
    const info = await transporter.sendMail(mailOptions);
    
    // Enviar email de confirmação
    await transporter.sendMail(confirmationOptions);
    
    return {
      success: true,
      messageId: info.messageId,
      message: 'Email enviado com sucesso!'
    };
    
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error(`Falha no envio do email: ${error.message}`);
  }
};

/**
 * Função para testar a configuração de email
 */
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return { success: true, message: 'Conexão de email configurada corretamente!' };
  } catch (error) {
    console.error('Erro na configuração de email:', error);
    return { success: false, message: error.message };
  }
};
