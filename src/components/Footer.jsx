import React from "react";
import { BsFacebook } from "react-icons/bs";
import { Footer, TextInput } from "flowbite-react";
import { FaTiktok, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../assets/images/esms 1.png";

const MyFooter = () => {
  return (
    <footer className="bg-neutralBlack text-white">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto py-6">
        <div className="grid w-full gap-14 md:grid-cols-4 text-white">
          <div className="mt-2 flex flex-col">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="ESMS Logo"
                className="w-10 inline-block items-center"
              />
              <span className="text-2xl font-semibold">ESMS</span>
            </div>
            <div className="my-4">
              <Footer.Title title="LIÊN HỆ" className="text-white font-bold" />
              <div className="flex items-center mb-3">
                <FaMapMarkerAlt className="mr-4" />
                <span>
                  Lô E2a-7, Đường D1 Khu Công nghệ
                  <br />
                  cao, P. Long Thạnh Mỹ, TP. Thủ Đức.
                </span>
              </div>
              <div className="flex items-center mb-3">
                <FaEnvelope className="mr-3" />
                <span>esms.htqlvbh@gmail.com</span>
              </div>
              <div className="flex items-center mb-3">
                <FaPhone className="mr-3" />
                <span>+84 789 822 660</span>
              </div>
            </div>
          </div>

          <div>
            <Footer.Title
              title="CÔNG TY ESMS"
              className="text-white font-bold ml-24"
            />
            <Footer.LinkGroup col className="ml-24">
              <Footer.Link href="#" className="text-white" id="about">
                Về chúng tôi
              </Footer.Link>
              <Footer.Link href="#" className="text-white" id="service">
                Dịch vụ
              </Footer.Link>
              <Footer.Link href="#" className="text-white" id="faq">
                Liên hệ
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title
              title="HỖ TRỢ KHÁCH HÀNG"
              className="text-white font-bold ml-12"
            />
            <Footer.LinkGroup col className="ml-12">
              <Footer.Link href="#" className="text-white">
                Trung tâm hỗ trợ
              </Footer.Link>
              <Footer.Link href="#" className="text-white">
                Chính sách bảo mật
              </Footer.Link>
              <Footer.Link href="#" className="text-white">
                Chính sách thanh toán
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div className="flex flex-col justify-between ml-16">
            <div className="flex space-x-6 mt-4">
              <a
                href="https://www.facebook.com/share/tPxos5SStuJBkhxC/?mibextid=LQQJ4d"
                className="text-white"
              >
                <BsFacebook className="text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@esms.htqlvbhtsk?fbclid=IwZXh0bgNhZW0CMTAAAR3hYTLIiEvDDkvZLOA6MwCi6lX5QrF3rZgDX2Yq51Xnuuh9feiyiyTDNhQ_aem_AV0SrbhcrCNMTl_5-7GTEu1cRZMZB_6FIJ9UNpHUJewdN7nwoEdZuQZ84APK8de6Nc6i3GVjPDZ9gonrCqRAgUc3"
                className="text-white"
              >
                <FaTiktok className="text-white" />
              </a>
            </div>
          </div>
        </div>
        <hr className="border-t-1 border-white w-full my-4" />
        <div className="text-gray-300 mt-auto">
          <p className="mb-1 text-gray-300">
            <span className="font-bold text-white whitespace-nowrap">
              © 2024 - ESMS Event Sale Management System
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
