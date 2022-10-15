﻿using POS;


ShowTitle();
var opcao = Console.ReadLine();

while (opcao != "0")
{
    switch (opcao)
    {
        case "1":
            Console.WriteLine("Digite o valor da venda:");
            var valor = Console.ReadLine();
            Console.WriteLine("Digite o número do cartão:");
            var numerocartao = Console.ReadLine();

            SendMessage(new Shared.ObjectTransfer(numerocartao, float.Parse(valor)));
            opcao = null;
            ShowTitle();
            break;
        case "0":
        default:
            Environment.Exit(0);
            break;

    }

}


static void SendMessage(Shared.ObjectTransfer obj)
{
    try
    {
        new Publisher().Publish(obj);
        Console.WriteLine("Venda realizada.");

    }
    catch (System.Exception ex)
    {
        Console.WriteLine(ex.Message);
        throw;
    }
}


static void ShowTitle()
{
    Console.Clear();
    Console.WriteLine("**********************");
    Console.WriteLine("****** WallCard ******");
    Console.WriteLine("**********************");
    Console.WriteLine("");
    Console.WriteLine("Digite a opção desejada:");
    Console.WriteLine("1 - Nova venda");
    Console.WriteLine("0 - Sair");
}

// try
// {
//     var objectToTransfer = new Shared.ObjectTransfer("1234432112344321", 50);

//     new Publisher().Publish(objectToTransfer);

//     // Console.WriteLine($"Object sended!");

// }
// catch (Exception ex)
// {
//   Console.WriteLine(ex.Message);
// }