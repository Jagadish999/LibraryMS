using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LMS.Application.LLBL.DatabaseSpecific;
using LMS.Application.Model;
using LMS.Application.Service.DataAccess;

namespace LMS.Application.Service.Book
{
    public class BookService : IBookService
    {
        public string getBookSel(string Json)
        {

            var bookDetails = DataAccessHelper.FetchDerivedModel<MvJson>(RetrievalProcedures.GetSpBookSelCallAsQuery(Json))?.FirstOrDefault();

            if(bookDetails == null)
            {
                return "{}";
            }

            return bookDetails.Json;
        }
    }
}
