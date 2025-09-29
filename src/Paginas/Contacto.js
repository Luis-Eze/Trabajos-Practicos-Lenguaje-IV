import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Modal from "../componentes/Modal";

const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ sending: false, msg: "" });
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const validate = (form) => {
    const e = {};
    const name = form.from_name.value.trim();
    const email = form.from_email.value.trim();
    const message = form.message.value.trim();

    if (!name) e.from_name = "El nombre es obligatorio.";
    else if (name.length < 2) e.from_name = "El nombre debe tener al menos 2 caracteres.";

    if (!email) e.from_email = "El correo es obligatorio.";
    else if (!EMAIL_RGX.test(email)) e.from_email = "Ingresá un correo válido.";

    if (!message) e.message = "El mensaje es obligatorio.";
    else if (message.length < 10) e.message = "El mensaje debe tener al menos 10 caracteres.";

    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const honeypot = form.website.value;
    if (honeypot) return; // bot

    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setStatus({ sending: true, msg: "" });
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      );
      form.reset();
      setStatus({ sending: false, msg: "¡Mensaje enviado!" });
      setOpenModal(true); // ventana de confirmación
    } catch (err) {
      console.error(err);
      setStatus({ sending: false, msg: "Ocurrió un error al enviar. Probá nuevamente." });
    }
  };

  return (
    <>
      <h1>Contacto</h1>
      <p>Dejanos tu mensaje y te respondemos por correo.</p>

      <form ref={formRef} onSubmit={onSubmit} className="contact-form">
        <label>
          Nombre
          <input name="from_name" type="text" placeholder="Tu nombre" />
          {errors.from_name && <span className="field-error">{errors.from_name}</span>}
        </label>

        <label>
          Dirección de Correo
          <input name="from_email" type="email" placeholder="tu@email.com" />
          {errors.from_email && <span className="field-error">{errors.from_email}</span>}
        </label>

        <label>
          Mensaje
          <textarea name="message" rows="5" placeholder="Escribí tu consulta..." />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </label>

        <input type="text" name="website" autoComplete="off" tabIndex="-1" className="hp" />

        <button type="submit" className="btn" disabled={status.sending}>
          {status.sending ? "Enviando..." : "Enviar"}
        </button>

        <output role="status" aria-live="polite" className="msg">
          {status.msg}
        </output>
      </form>

      <Modal open={openModal} onClose={() => setOpenModal(false)} title="¡Correo enviado!">
        <p>El mensaje se envia correctamente. Te responderemos a la brevedad.</p>
      </Modal>
    </>
  );
}
