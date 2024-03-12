using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LMS.Application.LLBL.DatabaseSpecific;
using LMS.Application.Model;
using LMS.Application.Service.DataAccess;

namespace LMS.Application.Service.Common
{
    public class CommonService : ICommonService
    {
        public string getCustomerTblDetail(string Json)
        {
            var customerTblDetail = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpCustomerSelCallAsQuery(Json))?.FirstOrDefault();

            if(customerTblDetail == null)
            {
                return "{}";
            }

            return customerTblDetail.Json;
        }
    }
}
