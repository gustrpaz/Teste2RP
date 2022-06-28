using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TESTE2RP_API.Domains;
using TESTE2RP_API.Interfaces;
using TESTE2RP_API.ViewModels;

namespace TESTE2RP_API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsernameRepository _userRepository;

        public LoginController(IUsernameRepository ctx)
        {
            _userRepository = ctx;
        }
        /// <summary>
        /// Method responsible for logging into the application
        /// </summary>
        /// <param name="UserLogin"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Login(LoginViewModel UserLogin)
        {
            try
            {
                UserName queryUser = _userRepository.Login(UserLogin.email, UserLogin.password);

                if (queryUser == null)
                {
                    return Unauthorized(new { msg = "Email ou senha inválidos!" });
                }

                var tokenClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, queryUser.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, queryUser.IdUser.ToString()),
                    new Claim(ClaimTypes.Role, queryUser.IdUserType.ToString()),
                    new Claim("role", queryUser.IdUserType.ToString()),


                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("teste2rp-token-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var myToken = new JwtSecurityToken(
                        issuer: "TESTE2RP_API",
                        audience: "TESTE2RP_API",
                        claims: tokenClaims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(myToken)
                });
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}
