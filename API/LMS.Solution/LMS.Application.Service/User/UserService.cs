using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using LMS.Application.LLBL.DatabaseSpecific;
using LMS.Application.Model;
using LMS.Application.Service.DataAccess;

namespace LMS.Application.Service.User
{
    public class UserService : IUserService
    {
        public string getSpecificUser(string Json)
        {

            var userInfo = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpUserSelCallAsQuery(Json))?.FirstOrDefault();
            if (userInfo == null)
            {
                return "{}";
            }

            return userInfo.Json;
        }

        public string customerUserTsk(string Json)
        {
            using (var adapter = DataAccessHelper.GetAdapter())
            {
                string param = Json;

                ActionProcedures.SpUserCustomerTsk(ref Json, adapter);
                adapter.CloseConnection();
            }

            return Json;
        }
    }
}
