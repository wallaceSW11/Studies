using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Registration.Models;
using Registration.Repositories;

namespace Registration.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly PersonRepository _repository;

        public PersonController(PersonRepository repository)
        {
            _repository = repository;
        }


        [HttpPost()]
        public async Task<ActionResult<Person>> Create([FromBody] Person person)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _repository.Insert(person);

            return Created("Create", person);
        }

        [HttpGet("{id}")]
        public ActionResult GetById([FromRoute] string id)
        {
            var personFounded = _repository.FindById(id);

            if (personFounded == null) return NotFound();

            return Ok(personFounded);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<Person>> GetById([FromRoute] string id)
        // {
        //     Person personFounded = await _repository.FindById(id);

        //     if (personFounded == null) return NotFound();

        //     return Ok(personFounded);
        // }
    }
}