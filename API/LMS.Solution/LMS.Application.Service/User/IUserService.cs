using System;
using System.Collections.Generic;
using System.Text;

namespace LMS.Application.Service.User
{
    public interface IUserService
    {

        string getSpecificUser(string Json);

        string customerUserTsk(string Json);
    }
}
