using System;
using System.Collections.Generic;
using System.Text;
using LMS.Application.LLBL.DatabaseSpecific;

namespace LMS.Application.Service.DataAccess
{
    public class DataAccessManager : DataAccessAdapter
    {
        public DataAccessManager() : base() { }

        public DataAccessManager(bool keepConnectionOpen) : base(true) { }

    }
}
