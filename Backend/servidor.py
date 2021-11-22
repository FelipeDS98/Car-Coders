from decouple import config
from flask import Flask, request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest import Client

app = Flask(__name__)

account_sid = config('TWILIO_ACCOUNT_SID')
auth_token = config('TWILIO_AUTH_TOKEN')
client = Client(account_sid, auth_token)

sg = SendGridAPIClient(config('SENDGRID_API_KEY'))

@app.route('/')
def inicio():
    return 'El servidor funciona'

@app.route('/sms')
def sms():
    try:
        contenido = request.args.get("mensaje")
        destino = request.args.get("telefono")

        message = client.messages \
                        .create(
                            body=contenido,
                            from_='+19295316519',
                            to='+57' + destino
                        )

        print(message.sid)
        return "¡Mensaje enviado!"
    except Exception as e:
        return "Error enviando mensaje de texto"

@app.route('/envio-correo')
def email():
    correo = request.args.get("correo")
    asunto = request.args.get("asunto")
    mensaje = request.args.get("mensaje")

    message = Mail(
        from_email='andresdiaz9822@gmail.com',
        to_emails=correo,
        subject=asunto,
        html_content=mensaje)

    try:
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "El correo se ha enviado exitosamente"

    except Exception as e:
        print(e)
        return "Error enviando correo"

if __name__ == '__main__':
    app.run()
