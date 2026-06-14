import { useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {

  // DATA DUMMY KHUSUS LAUNDRY
  const [products] = useState([
    {
      id: 1,
      title: "Detergen Premium",
      code: "DTG-01",
      brand: "LaundryClean",
      category: "Detergen",
      price: 85000,
      stock: 24
    },

    {
      id: 2,
      title: "Parfum Laundry Sakura",
      code: "PRF-02",
      brand: "FreshWash",
      category: "Pewangi",
      price: 65000,
      stock: 15
    },

    {
      id: 3,
      title: "Pelembut Pakaian",
      code: "PLB-03",
      brand: "SoftCare",
      category: "Softener",
      price: 70000,
      stock: 8
    },

    {
      id: 4,
      title: "Plastik Laundry",
      code: "PLS-04",
      brand: "PackClean",
      category: "Packaging",
      price: 35000,
      stock: 50
    },

    {
      id: 5,
      title: "Hanger Premium",
      code: "HGR-05",
      brand: "DryCare",
      category: "Accessories",
      price: 25000,
      stock: 40
    },

    {
      id: 6,
      title: "Pembersih Sepatu",
      code: "SHT-06",
      brand: "ShoeGlow",
      category: "Shoe Care",
      price: 95000,
      stock: 6
    }
  ]);

  return (

    <div className="bg-[#F8F9FB] min-h-screen p-6 relative">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">

          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">
              Laundry Products
            </h1>

            <p className="text-gray-400 text-sm font-medium">
              Manage your laundry supplies and operational products
            </p>
          </div>

          <div className="h-[46px] w-1 sm:block hidden"></div>

        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-left border-separate border-spacing-y-3">

              <thead>
                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">

                  <th className="pl-6 pb-2">
                    Product Name
                  </th>

                  <th className="pb-2">
                    Category
                  </th>

                  <th className="pb-2 text-right">
                    Price
                  </th>

                  <th className="pb-2 text-center pr-6">
                    Stock
                  </th>

                </tr>
              </thead>

              <tbody>

                {products.map((item) => (

                  <tr
                    key={item.id}
                    className="group transition-all"
                  >

                    {/* PRODUCT */}
                    <td className="py-4 pl-6 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50 transition-colors">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 font-black shrink-0">
                          {(item.title || "P").charAt(0)}
                        </div>

                        <div>

                          <Link
                            to={`/products/${item.id}`}
                            className="text-gray-800 font-bold hover:text-pink-500 transition-colors block leading-tight"
                          >
                            {item.title}
                          </Link>

                          <span className="text-[10px] font-black text-gray-400 uppercase">
                            {item.code} | {item.brand}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* CATEGORY */}
                    <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-gray-500 text-sm transition-colors">

                      {item.category}

                    </td>

                    {/* PRICE */}
                    <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-sm text-right font-black text-gray-900 transition-colors">

                      Rp {item.price.toLocaleString("id-ID")}

                    </td>

                    {/* STOCK */}
                    <td className="py-4 pr-6 bg-gray-50 rounded-r-2xl group-hover:bg-pink-50 text-center transition-colors">

                      <span
                        className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                          item.stock < 10
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.stock} Qty
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}