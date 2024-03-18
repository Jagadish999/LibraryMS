using System;
using System.Collections.Generic;
using System.Text;

namespace LMS.Application.Service.Common
{
    public interface ICommonService
    {

        string getCustomerTblDetail(String Json);

        string getCustomerBorrowedBooks(String Json);

        string getCustomerSpecificPayment(String Json);
    }


}
