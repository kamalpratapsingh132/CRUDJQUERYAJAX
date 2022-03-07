using CRUDJQUERYAJAX.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDJQUERYAJAX.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly ApplicationContext dbcontext;

        public EmployeeController(ApplicationContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetEmployee(int? id)
        {
            var emp = dbcontext.Employees.ToList();
            if (id != null)
            {
                emp = emp.Where(x => x.Id == id).ToList();
            }
            return new JsonResult(emp);
        }


        //public IActionResult Show(int? id)
        //{
        //    var emp = dbcontext.Employees.ToList();
        //    if (id != null)
        //    {
        //        emp = emp.Where(x => x.Id == id).ToList();
        //    }
        //    return PartialView (emp);
        //}
        //public IActionResult GetEmployee()
        //{
        //    var emp = dbcontext.Employees.ToList();
        //    return new JsonResult(emp);
        //}

        [HttpPost]

        public IActionResult CreateEmployee([FromBody] Employee obj)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult("input field can't be empty");
            }
            dbcontext.Employees.Add(obj);
            dbcontext.SaveChanges();
            return new JsonResult(obj);
        }

        [HttpPost]
        public IActionResult UpdateEmployee([FromBody] Employee obj)
        {
            Employee emp = (from c in dbcontext.Employees
                            where c.Id == obj.Id
                            select c).FirstOrDefault();

            emp.Name = obj.Name;
            emp.Age = obj.Age;
            emp.Address = obj.Address;
            emp.Salary = obj.Salary;
            emp.Gender = obj.Gender;
            dbcontext.Update(emp);
            dbcontext.SaveChanges();
            return new JsonResult(emp);



        }
        public void DeleteEmployee(int id)
        {
            Employee model = (from c in dbcontext.Employees
                              where c.Id == id
                              select c).FirstOrDefault();
            dbcontext.Employees.Remove(model);
            dbcontext.SaveChanges();

        }

    }
}

