using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TESTE2RP_API.Domains;

namespace TESTE2RP_API.Interfaces
{
// Interface responsável pelo UsernameRepository
    public interface IUsernameRepository
    {

 
        List<UserName> ReadAll();
        UserName Create(UserName NewUser);
        UserName Update(int IdUser, UserName UpdatedUser);
        void UpdateOnly(int IdUser);
        void Delete(int IdUserName);
        void EncryptPassword(UserName _user);
        UserName SearchByID(int id);
        UserName Login(string email, string password);
    }
}
