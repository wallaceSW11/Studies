using RabbitMQ.Client;
using System;
using System.Text;
using Shared;

namespace Administrator
{
    public class Receptor
    {
        public void Consume()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "order",
                                         durable: false,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

                    var data = channel.BasicGet("order", true);

                    if (data is null) return;

                    var json = Encoding.UTF8.GetString(data.Body.ToArray());

                    var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Shared.ObjectTransfer>(json);

                    Console.WriteLine($"***********************************");
                    Console.WriteLine($"Mensagem recebida:");
                    Console.WriteLine($"Valor da venda: {obj.CardNumber}");
                    Console.WriteLine($"Número do cartão: {obj.Value}");
                    Console.WriteLine("");

                }
            }
        }
    }
}