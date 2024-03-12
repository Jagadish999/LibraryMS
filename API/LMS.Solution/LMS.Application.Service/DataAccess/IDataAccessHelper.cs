using System;
using System.Collections.Generic;
using System.Text;
using SD.LLBLGen.Pro.ORMSupportClasses;

namespace LMS.Application.Service.DataAccess
{
    public interface IDataAccessHelper
    {

        List<T> FetchDerivedModel<T>(IRetrievalQuery qry);
        DataAccessManager GetAdapter();
    }
}
