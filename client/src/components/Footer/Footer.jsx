import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Fade} from "react-awesome-reveal"
import {
  faSquareGithub,
  faSquareFacebook,
  faSquareXTwitter,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Feedback from "@/components/Feedback/Feedback";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <Fade>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Free eBooks
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Development Tutorial
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  How to - Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  YouTube Playlist
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          
            <div className="flex items-center mb-4">
              <Feedback />
            </div>
            
          
        </div>

        <div className="mt-8 gap-2 border-t pt-8 text-center md:text-left md:justify-between flex items-center bg-slate-900">
          <span className="text-sm text-gray-400">
            &copy; Copyright 2024, All Rights Reserved
          </span>
          <div className="flex gap-3">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <FontAwesomeIcon icon={faSquareXTwitter} style={{ fontSize: "24px" }}/>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
            <FontAwesomeIcon icon={faSquareFacebook} style={{ fontSize: "24px" }}/>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
            <FontAwesomeIcon icon={faSquareInstagram} style={{ fontSize: "24px" }}/>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
            <FontAwesomeIcon icon={faSquareGithub} style={{ fontSize: "24px" }} />
            </a>
            </div>
        </div>
      </div>
      </Fade>
    </footer>
  );
};

export default Footer;
