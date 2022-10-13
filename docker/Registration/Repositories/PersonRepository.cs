using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Registration.Models;

namespace Registration.Repositories
{
    public class PersonRepository
    {
        List<Person> _persons = new List<Person>();

        public Task Insert(Person person)
        {
            _persons.Add(person);

            return Task.FromResult(person);
        }

        public Task Delete(string id)
        {
            var personFounded = _persons.Find(p => p.Id == id);
            _persons.Remove(personFounded);

            return Task.FromResult(personFounded);
        }

        public Task FindById(string id)
        {
            var personFound = _persons.Find(p => p.Id == id);

            return Task.FromResult(personFound);
        }
    }
}