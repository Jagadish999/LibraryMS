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
        public string getCustomerBorrowedBooks(string Json)
        {
            var customerBooks = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpCustomerBorrowedBooksSelCallAsQuery(Json))?.FirstOrDefault();

            if (customerBooks == null)
            {
                return "{}";
            }

            return customerBooks.Json;
        }

        public string getCustomerSpecificPayment(string Json)
        {
            throw new NotImplementedException();
        }

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
