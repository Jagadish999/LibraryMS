using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LMS.Application.LLBL.DatabaseSpecific;
using LMS.Application.Model;
using LMS.Application.Service.DataAccess;

namespace LMS.Application.Service.Borrow
{
    public class BorrowService : IBorrowService
    {
        public string borrowSel(string Json)
        {
 
            var borrowDetails = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpBorrowSelCallAsQuery(Json))?.FirstOrDefault();

            if(borrowDetails == null)
            {
                return "{}";
            }

            return borrowDetails.Json;
        }

        public string borrowTransactionSel(string Json)
        {

            var borrowDetails = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpBorrowTransactionSelCallAsQuery(Json))?.FirstOrDefault();

            if (borrowDetails == null)
            {
                return "{}";
            }

            return borrowDetails.Json;
        }

        public string borrowTsk(string json)
        {
            using (var adapter = DataAccessHelper.GetAdapter())
            {
                string param = json;

                ActionProcedures.SpBorrowTsk(ref json, adapter);
                adapter.CloseConnection();
            }

            return json;
        }
    }
}
