using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Shared;
using System.Text;

namespace POS
{
    public class Publisher
    {
        public void Publish(ObjectTransfer obj)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.ConfirmSelect();
                channel.BasicAcks += Evento_Confirmacao;
                channel.BasicNacks += Evento_NaoConfirmacao;

                channel.QueueDeclare(queue: "order",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var json = Newtonsoft.Json.JsonConvert.SerializeObject(obj);

                var body = Encoding.UTF8.GetBytes(json);

                channel.BasicPublish(exchange: "",
                                     routingKey: "order",
                                     basicProperties: null,
                                     body: body);

                Console.WriteLine("Mensagem enviada!");
            }

        }

        private void Evento_NaoConfirmacao(object sender, BasicNackEventArgs e)
        {
            Console.WriteLine("Nack");
        }

        private void Evento_Confirmacao(object sender, BasicAckEventArgs e)
        {
            Console.WriteLine("Ack");
        }


    }
}