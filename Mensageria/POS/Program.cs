using Shared;
using POS;

try
{
    var objectToTransfer = new Shared.ObjectTransfer("1234432112344321", 50);

    new Publisher().Publish(objectToTransfer);

    // Console.WriteLine($"Object sended!");

}
catch (Exception ex)
{
  Console.WriteLine(ex.Message);
}