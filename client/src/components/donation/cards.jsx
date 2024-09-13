import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import funds from "@/objects/funds";
import gpay from "@/assets/svg/google-pay-or-tez.svg";
import netbanking from "@/assets/svg/net-banking-icon.svg";
import card from "@/assets/svg/credit-card-color-icon.svg";
import { Fade } from "react-awesome-reveal";

export default function Card() {
  const OverlayOne = ({ fund }) => (
    <ModalOverlay
      
      backdropFilter="blur(10px)"
    >
      <ModalContent>
        <ModalHeader>{fund.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{fund.story}</Text>
          <ul className="my-4 space-y-3">
            <li>
              <a
                href=""
                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <img className="size-6 mx-auto" src={gpay} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Google Pay
                </span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                  Popular
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <img className="size-6 mx-auto" src={netbanking} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Net Banking
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <img className="size-6 mx-auto" src={card} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Credit or Debit Card
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5"
                  viewBox="0 0 512 512"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <radialGradient
                      cx="0%"
                      cy="50%"
                      fx="0%"
                      fy="50%"
                      r="100%"
                      id="radialGradient-1"
                    >
                      <stop stopColor="#5D9DF6" offset="0%"></stop>
                      <stop stopColor="#006FFF" offset="100%"></stop>
                    </radialGradient>
                  </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="logo">
                      <rect
                        id="base"
                        fill="url(#radialGradient-1)"
                        x="0"
                        y="0"
                        width="512"
                        height="512"
                        rx="256"
                      ></rect>
                      <path
                        d="M169.209772,184.531136 C217.142772,137.600733 294.857519,137.600733 342.790517,184.531136 L348.559331,190.179285 C350.955981,192.525805 350.955981,196.330266 348.559331,198.676787 L328.82537,217.99798 C327.627045,219.171241 325.684176,219.171241 324.485851,217.99798 L316.547278,210.225455 C283.10802,177.485633 228.89227,177.485633 195.453011,210.225455 L186.951456,218.549188 C185.75313,219.722448 183.810261,219.722448 182.611937,218.549188 L162.877976,199.227995 C160.481326,196.881474 160.481326,193.077013 162.877976,190.730493 L169.209772,184.531136 Z M383.602212,224.489406 L401.165475,241.685365 C403.562113,244.031874 403.562127,247.836312 401.165506,250.182837 L321.971538,327.721548 C319.574905,330.068086 315.689168,330.068112 313.292501,327.721609 C313.292491,327.721599 313.29248,327.721588 313.29247,327.721578 L257.08541,272.690097 C256.486248,272.103467 255.514813,272.103467 254.915651,272.690097 C254.915647,272.690101 254.915644,272.690105 254.91564,272.690108 L198.709777,327.721548 C196.313151,330.068092 192.427413,330.068131 190.030739,327.721634 C190.030725,327.72162 190.03071,327.721606 190.030695,327.721591 L110.834524,250.181849 C108.437875,247.835329 108.437875,244.030868 110.834524,241.684348 L128.397819,224.488418 C130.794468,222.141898 134.680206,222.141898 137.076856,224.488418 L193.284734,279.520668 C193.883897,280.107298 194.85533,280.107298 195.454493,279.520668 C195.454502,279.520659 195.45451,279.520651 195.454519,279.520644 L251.65958,224.488418 C254.056175,222.141844 257.941913,222.141756 260.338618,224.488222 C260.338651,224.488255 260.338684,224.488288 260.338717,224.488321 L316.546521,279.520644 C317.145683,280.107273 318.117118,280.107273 318.71628,279.520644 L374.923175,224.489406 C377.319825,222.142885 381.205562,222.142885 383.602212,224.489406 Z"
                        id="WalletConnect"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  WalletConnect
                </span>
              </a>
            </li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              alert("Donation successful!");
            }}
          >
            Donate Offline
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFund, setSelectedFund] = React.useState(null);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {selectedFund && <OverlayOne fund={selectedFund} />}
      </Modal>
      <div className="flex flex-wrap justify-between bg-indigo-200">
        
        {funds.map((fund) => (
          <div key={fund.id} className="max-w-lg mx-auto mb-5">
            <Fade>
            <div className="bg-slate-900 shadow-md border border-gray-800 transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-500 rounded-lg max-w-sm mb-5">
              <img
                className="rounded-t-lg h-48 w-full object-cover"
                src={fund.image}
                alt=""
              />
              <div className="p-5">
                <a href="#">
                  <h5 className="text-white font-bold text-2xl tracking-tight mb-2">
                    {fund.title}
                  </h5>
                </a>
                <p className="font-normal text-white mb-3">
                  {fund.description.substring(0, 100)}
                  {fund.description.length > 100 && "..."}
                </p>
                <button
                  onClick={() => {
                    setSelectedFund(fund);
                    onOpen();
                  }}
                  className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-indigo-200 p-4 px-5 py-2 font-medium text-slate-900 transition duration-300 ease-out bg-indigo-200 rounded-md"
                >
                  <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-slate-900 text-indigo-200 duration-300 group-hover:translate-x-0">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="ease absolute flex h-full w-full transform items-center justify-center text-slate-900 transition-all duration-300 group-hover:translate-x-full">
                    Read More
                  </span>
                  <span className="invisible relative">Read More</span>
                </button>
              </div>
            </div>
            </ Fade>
          </div>
        
        ))}
        
      </div>
    </>
  );
}
