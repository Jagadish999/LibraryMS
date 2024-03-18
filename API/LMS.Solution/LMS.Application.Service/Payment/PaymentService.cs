using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LMS.Application.LLBL.DatabaseSpecific;
using LMS.Application.Model;
using LMS.Application.Service.DataAccess;

namespace LMS.Application.Service.Payment
{
    public class PaymentService : IPaymentService
    {

        /*
         var userInfo = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpUserSelCallAsQuery(Json))?.FirstOrDefault();
            if (userInfo == null)
            {
                return "{}";
            }

            return userInfo.Json;
         */
        public string paymentTransactionSel(string Json)
        {
            var payments = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpPaymentInvoiceSelCallAsQuery(Json))?.FirstOrDefault();

            if (payments == null)
            {
                return "{}";
            }

            return payments.Json;
        }
    }
}
