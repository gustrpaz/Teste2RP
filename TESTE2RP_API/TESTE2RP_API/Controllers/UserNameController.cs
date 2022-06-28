using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using TESTE2RP_API.Domains;
using TESTE2RP_API.Interfaces;
using TESTE2RP_API.Repositories;


namespace TESTE2RP_API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserNameController : ControllerBase
    {
        private IUsernameRepository _repository { get; set; }
        
  
        public UserNameController(IUsernameRepository user)
        {
            _repository = user;
        }

        /// <summary>
        /// Method responsible for list all Users
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "1,2")]
        [HttpGet("ListAll")]
        public IActionResult ReadAll() 
        {
            try
            {
                return Ok(_repository.ReadAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for list User by unique id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{Id}")]
        public IActionResult ReadMy(int Id)
        {
            try
            {
                return Ok(_repository.SearchByID(Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for update user by unique id 
        /// </summary>
        /// <param name="IdUserName"></param>
        /// <param name="UpdatedUser"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("{IdUserName}")]
        public IActionResult Update(int IdUserName, UserName UpdatedUser)
        {
            try
            {
                UserName UserNameSought = _repository.SearchByID(IdUserName);

                if (UserNameSought != null)
                {
                    if (UpdatedUser != null)
                        _repository.Update(IdUserName, UpdatedUser);
                }
                else
                {
                    return BadRequest();
                }

                return Ok();

            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }

        [Authorize]
        [HttpPatch("UpdateOnly/{IdUserName}")]
        public IActionResult UpdateOnly(int IdUserName)
        {
            try
            {
                UserName UserNameSought = _repository.SearchByID(IdUserName);
                if (UserNameSought == null)
                {
                    return NotFound("O usuario não foi encontrado");
                }
                else
                {
                    _repository.UpdateOnly(IdUserName);
                    return Ok("O usuario foi atualizado");
                }
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        /// <summary>
        /// Method responsible for create all users
        /// </summary>
        /// <param name="NewUser"></param>
        /// <returns></returns>
        [Authorize(Roles = "1,2")]
        [HttpPost]
        public IActionResult Create(UserName NewUser)
        {
            try
            {
                _repository.Create(NewUser);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for delete user by unique id
        /// </summary>
        /// <param name="IdUserName"></param>
        /// <returns></returns>
        [Authorize(Roles = "2")]
        [HttpDelete("{IdUserName}")]
        public IActionResult Delete(int IdUserName)
        {
            try
            {

                if (IdUserName > 0)
                {
                    _repository.Delete(IdUserName);
                }
                else
                {
                    return BadRequest();
                }

                return Ok();

            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }

        

        }
    }
}
