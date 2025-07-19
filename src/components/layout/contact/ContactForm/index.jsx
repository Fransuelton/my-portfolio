import { useState } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar mensagens quando usuário digitar
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // URL da API dinâmica baseada no ambiente
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000' || 'https://api.fransuelton.dev';
      
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: 'Mensagem enviada com sucesso! Retornarei em breve.'
        });
        
        // Limpar formulário
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Erro ao enviar mensagem. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessage({
        type: 'error',
        text: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message.text && (
        <MessageAlert type={message.type}>
          {message.text}
        </MessageAlert>
      )}

      <StyledInput 
        id="name" 
        type="text" 
        name="name" 
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <StyledInput 
        id="email" 
        type="email" 
        name="email" 
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <StyledTextArea 
        id="message" 
        name="message" 
        placeholder="Sua Mensagem"
        value={formData.message}
        onChange={handleChange}
        required
        disabled={loading}
        rows="6"
      />

      <StyledButton type="submit" disabled={loading}>
        {loading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} spin />
            Enviando...
          </>
        ) : (
          <>
            Enviar Mensagem
            <FontAwesomeIcon icon={faArrowRight} />
          </>
        )}
      </StyledButton>
    </StyledForm>
  );
};

const MessageAlert = styled.div`
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  
  ${props => props.type === 'success' ? `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  ` : `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`;

const StyledInput = styled.input`
  height: 5rem;
  width: 100%;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  outline: none;
  background-color: #181818;
  border: none;
  color: var(--quaternary-color);
  font-size: 1.6rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #fff;
    font-size: 1.6rem;
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--tertiary-color);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StyledTextArea = styled.textarea`
  min-height: 14rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  border: none;
  outline: none;
  background-color: var(--primary-color);
  border: none;
  resize: vertical;
  color: var(--quaternary-color);
  font-size: 1.6rem;
  font-family: inherit;
  transition: all 0.3s ease;

  &::placeholder {
    color: #fff;
    font-size: 1.6rem;
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--tertiary-color);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  align-self: flex-start;
  cursor: pointer;
  width: 20rem;
  height: 5rem;
  padding: 1rem;
  border-radius: 0.8rem;
  background-color: var(--tertiary-color);
  border: none;
  font-size: 1.6rem;
  color: var(--quaternary-color);
  transition: 0.5s;
  font-weight: 500;
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  &:hover:not(:disabled) {
    background-color: #fff;
    color: var(--tertiary-color);
    border-color: #fff;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    align-self: center;
  }
`;

export { ContactForm };
