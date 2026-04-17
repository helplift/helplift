'use client';

import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import t from '@/data/text-content.json';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAppContext } from '@/context/AppContext';
import ButtonCircle from '@/components/ButtonCircle';
import ButtonGradient from '@/components/ButtonGradient';
import ContactData from '@/components/ContactData';
import contactFormData from '@/data/contact-form.json';

const ContactForm = () => {
  const { contactFormVisible, setContactFormVisible } = useAppContext();
  const errorMsg = t['contact-form']['error-required'];
  const successMsg = t['contact-form']['success'];
  const failureMsg = t['contact-form']['failure'];

  return (
    <div className={`contact-form ${contactFormVisible ? 'visible' : 'hidden'}`}>
      <div className="contact-form_blur"> </div>
      <div className="contact-form_content">
        <h2 className="contact-form_content_title">Контактна форма</h2>
        <Formik
          initialValues={contactFormData.initialValues}
          validationSchema={yup.object({
            name: yup.string().required(errorMsg),
            surname: yup.string().required(errorMsg),
            phone: yup.string().required(errorMsg),
            town: yup.string().required(errorMsg),
            comment: yup.string(),
          })}
          onSubmit={async (values, formikContext) => {
            emailjs
              .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                '#contact-form',
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
              )
              .then(
                () => {
                  formikContext.resetForm();
                  alert(successMsg);
                },
                () => {
                  alert(failureMsg);
                }
              );
            formikContext.setSubmitting(false);
          }}
        >
          {(formikContext) => (
            <Form className="contact-form_content_form" id="contact-form">
              {contactFormData.inputs.map((input) => (
                <label className={`label ${input.class ?? ''}`} key={input.name}>
                  <p className="label-text">{input.placeholder}</p>
                  <Field type="text" name={input.name} className="input" />
                  <hr className="input-line" />
                  <p className="error-msg">
                    <ErrorMessage name={input.name} />
                  </p>
                </label>
              ))}
              <ContactData />
              <button
                type="submit"
                className="submit-btn"
                disabled={formikContext.isSubmitting}
              >
                <p className="submit-btn-text btn-circle-sibling">Надіслати</p>
                <ButtonCircle />
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <button
        className="contact-form_close-btn"
        onClick={() => setContactFormVisible(false)}
        aria-label="Закрити форму"
      >
        <ButtonGradient>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="8.13065" y1="0.353553" x2="0.352479" y2="8.13173" stroke="#ffffff" />
            <line y1="-0.5" x2="11" y2="-0.5" transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.7771 0)" stroke="#ffffff" />
          </svg>
        </ButtonGradient>
      </button>
    </div>
  );
};

export default ContactForm;
