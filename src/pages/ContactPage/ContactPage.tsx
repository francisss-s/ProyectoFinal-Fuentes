import './ContactPage.css';

import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Aquí podrías manejar el envío del formulario, como enviar los datos a un servidor
        console.log('Formulario enviado:', { name, email, message });
        setSubmitted(true);
    };

    return (
        <div className="contact-page">
            <h1>Contacto</h1>
            <p>Nos encantaría saber de ti. Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>
            {submitted ? (
                <p className="success-message">¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</p>
            ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Enviar</button>
                </form>
            )}
        </div>
    );
}

export default ContactPage;
