using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TESTE2RP_API.Context;
using TESTE2RP_API.Domains;
using TESTE2RP_API.Interfaces;
using TESTE2RP_API.Utils;

namespace TESTE2RP_API.Repositories
{
    public class UsernameRepository : IUsernameRepository
    {
        private readonly Teste2rpContext ctx;

        public UsernameRepository(Teste2rpContext appContext)
        {
            ctx = appContext;
        }

        public UserName Create(UserName NewUser)
        {
            ctx.UserNames.Add(NewUser);
            ctx.SaveChangesAsync();

            return NewUser;
        }

        public void Delete(int IdUserName)
        {
            UserName UserNameSought = SearchByID(IdUserName);
            ctx.UserNames.Remove(UserNameSought);
            ctx.SaveChanges();
        }

        public async void EncryptPassword(UserName _user)

        {
            _user.Passwd = Crypt.GenerateHash(_user.Passwd);
            ctx.UserNames.Update(_user);
            await ctx.SaveChangesAsync();
        }

        public UserName Login(string email, string password)
        {
            var user = ctx.UserNames.FirstOrDefault(u => u.Email == email);

            if (user.Passwd == null)
            {
                return user;
            }

            if (user != null)
            {
                if (Crypt.Validate(user.Passwd) == true)
                {
                    bool IsEncrypted = Crypt.Compare(password, user.Passwd);
                    if (IsEncrypted)
                        return user;
                }
                else
                {
                    EncryptPassword(user);
                    bool IsEncrypted = Crypt.Compare(password, user.Passwd);
                    if (IsEncrypted)
                        return user;
                }
            }

            return null;
        }

        public List<UserName> ReadAll()
        {
            return ctx.UserNames.Select(
                u => new UserName
                {
                    IdUser = u.IdUser,
                    UserName1 = u.UserName1,
                    Email = u.Email,
                    IdUserType = u.IdUserType,
                    IdUserTypeNavigation = new UserType()
                    {
                        TitleUserType = u.IdUserTypeNavigation.TitleUserType
                    },
                    Status = u.Status

                }
                    ).ToList();
        }

        public UserName SearchByID(int id)
        {
            return ctx.UserNames.Find(id);
        }

        public UserName Update(int id, UserName UpdatedUser)
        {
            ctx.Entry(UpdatedUser).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return UpdatedUser;
        }

        public void UpdateOnly(int IdUser)
        {
            //UserName user_ = SearchByID(IdUser);

            //if (user_.Status == true)
            //{
            //    user_.Status = false;
            //}
            //else if (user_.Status == false)
            //{
            //    user_.Status = true;
            //}

            //ctx.UserNames.Update(user_);
            //ctx.SaveChanges();
       
        }

 
    }
}
