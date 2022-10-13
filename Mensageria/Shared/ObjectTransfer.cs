using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shared
{
    public class ObjectTransfer
    {
        public string Id { get; set; }
        public string CardNumber { get; set; }
        public float Value { get; set; }

        public ObjectTransfer(){}

        public ObjectTransfer(string cardNumber, float value)
        {
            Id = Guid.NewGuid().ToString();
            CardNumber = cardNumber;
            Value = value;
        }
    }
}