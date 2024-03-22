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
        public string getAdminDashboardData(string Json)
        {
            var dashboardData = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpDashboardSelCallAsQuery(Json))?.FirstOrDefault();

            if (dashboardData == null)
            {
                return "{}";
            }

            return dashboardData.Json;
        }

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
            var customerpayments = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpCustPaymentInvoiceSelCallAsQuery(Json))?.FirstOrDefault();

            if (customerpayments == null)
            {
                return "{}";
            }

            return customerpayments.Json;
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
