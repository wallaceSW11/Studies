using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Models
{
    public class Person : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName {
            get
            {
               return $"{FirstName} {LastName}";
            }
        }
        public string Email { get; set; }
        public string Password { get; set; }

        public Person():base(){}

        public Person(string firstName, string lastName, string email, string password):base()
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
        }
    }
}