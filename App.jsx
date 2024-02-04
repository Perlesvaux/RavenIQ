"use strict";

import React, {
  StrictMode,
  useState,
  createContext,
  useContext,
  useEffect,
  useRef
} from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

//Globally maps each item to its respective: Name, Question, Answer and Options (each option with its own index and sprite)
const S = [
  {N:"A1", Q:"./Q/A1.png", A:"4", O:[{index:1, sprite:"./O/A1_1.png"},{index:2, sprite:"./O/A1_2.png"},{index:3, sprite:"./O/A1_3.png"},{index:4, sprite:"./O/A1_4.png"},{index:5, sprite:"./O/A1_5.png"},{index:6, sprite:"./O/A1_6.png"}]},
  {N:"A2", Q:"./Q/A2.png", A:"5", O:[{index:1, sprite:"./O/A2_1.png"},{index:2, sprite:"./O/A2_2.png"},{index:3, sprite:"./O/A2_3.png"},{index:4, sprite:"./O/A2_4.png"},{index:5, sprite:"./O/A2_5.png"},{index:6, sprite:"./O/A2_6.png"}]},
  {N:"A3", Q:"./Q/A3.png", A:"1", O:[{index:1, sprite:"./O/A3_1.png"},{index:2, sprite:"./O/A3_2.png"},{index:3, sprite:"./O/A3_3.png"},{index:4, sprite:"./O/A3_4.png"},{index:5, sprite:"./O/A3_5.png"},{index:6, sprite:"./O/A3_6.png"}]},
  {N:"A4", Q:"./Q/A4.png", A:"2", O:[{index:1, sprite:"./O/A4_1.png"},{index:2, sprite:"./O/A4_2.png"},{index:3, sprite:"./O/A4_3.png"},{index:4, sprite:"./O/A4_4.png"},{index:5, sprite:"./O/A4_5.png"},{index:6, sprite:"./O/A4_6.png"}]},
  {N:"A5", Q:"./Q/A5.png", A:"6", O:[{index:1, sprite:"./O/A5_1.png"},{index:2, sprite:"./O/A5_2.png"},{index:3, sprite:"./O/A5_3.png"},{index:4, sprite:"./O/A5_4.png"},{index:5, sprite:"./O/A5_5.png"},{index:6, sprite:"./O/A5_6.png"}]},
  {N:"A6", Q:"./Q/A6.png", A:"3", O:[{index:1, sprite:"./O/A6_1.png"},{index:2, sprite:"./O/A6_2.png"},{index:3, sprite:"./O/A6_3.png"},{index:4, sprite:"./O/A6_4.png"},{index:5, sprite:"./O/A6_5.png"},{index:6, sprite:"./O/A6_6.png"}]},
  {N:"A7", Q:"./Q/A7.png", A:"6", O:[{index:1, sprite:"./O/A7_1.png"},{index:2, sprite:"./O/A7_2.png"},{index:3, sprite:"./O/A7_3.png"},{index:4, sprite:"./O/A7_4.png"},{index:5, sprite:"./O/A7_5.png"},{index:6, sprite:"./O/A7_6.png"}]},
  {N:"A8", Q:"./Q/A8.png", A:"2", O:[{index:1, sprite:"./O/A8_1.png"},{index:2, sprite:"./O/A8_2.png"},{index:3, sprite:"./O/A8_3.png"},{index:4, sprite:"./O/A8_4.png"},{index:5, sprite:"./O/A8_5.png"},{index:6, sprite:"./O/A8_6.png"}]},
  {N:"A9", Q:"./Q/A9.png", A:"1", O:[{index:1, sprite:"./O/A9_1.png"},{index:2, sprite:"./O/A9_2.png"},{index:3, sprite:"./O/A9_3.png"},{index:4, sprite:"./O/A9_4.png"},{index:5, sprite:"./O/A9_5.png"},{index:6, sprite:"./O/A9_6.png"}]},
  {N:"A10", Q:"./Q/A10.png", A:"3", O:[{index:1, sprite:"./O/A10_1.png"},{index:2, sprite:"./O/A10_2.png"},{index:3, sprite:"./O/A10_3.png"},{index:4, sprite:"./O/A10_4.png"},{index:5, sprite:"./O/A10_5.png"},{index:6, sprite:"./O/A10_6.png"}]},
  {N:"A11", Q:"./Q/A11.png", A:"5", O:[{index:1, sprite:"./O/A11_1.png"},{index:2, sprite:"./O/A11_2.png"},{index:3, sprite:"./O/A11_3.png"},{index:4, sprite:"./O/A11_4.png"},{index:5, sprite:"./O/A11_5.png"},{index:6, sprite:"./O/A11_6.png"}]},
  {N:"A12", Q:"./Q/A12.png", A:"4", O:[{index:1, sprite:"./O/A12_1.png"},{index:2, sprite:"./O/A12_2.png"},{index:3, sprite:"./O/A12_3.png"},{index:4, sprite:"./O/A12_4.png"},{index:5, sprite:"./O/A12_5.png"},{index:6, sprite:"./O/A12_6.png"}]},

  {N:"B1", Q:"./Q/B1.png", A:"2", O:[{index:1, sprite:"./O/B1_1.png"},{index:2, sprite:"./O/B1_2.png"},{index:3, sprite:"./O/B1_3.png"},{index:4, sprite:"./O/B1_4.png"},{index:5, sprite:"./O/B1_5.png"},{index:6, sprite:"./O/B1_6.png"}]},
  {N:"B2", Q:"./Q/B2.png", A:"6", O:[{index:1, sprite:"./O/B2_1.png"},{index:2, sprite:"./O/B2_2.png"},{index:3, sprite:"./O/B2_3.png"},{index:4, sprite:"./O/B2_4.png"},{index:5, sprite:"./O/B2_5.png"},{index:6, sprite:"./O/B2_6.png"}]},
  {N:"B3", Q:"./Q/B3.png", A:"1", O:[{index:1, sprite:"./O/B3_1.png"},{index:2, sprite:"./O/B3_2.png"},{index:3, sprite:"./O/B3_3.png"},{index:4, sprite:"./O/B3_4.png"},{index:5, sprite:"./O/B3_5.png"},{index:6, sprite:"./O/B3_6.png"}]},
  {N:"B4", Q:"./Q/B4.png", A:"2", O:[{index:1, sprite:"./O/B4_1.png"},{index:2, sprite:"./O/B4_2.png"},{index:3, sprite:"./O/B4_3.png"},{index:4, sprite:"./O/B4_4.png"},{index:5, sprite:"./O/B4_5.png"},{index:6, sprite:"./O/B4_6.png"}]},
  {N:"B5", Q:"./Q/B5.png", A:"1", O:[{index:1, sprite:"./O/B5_1.png"},{index:2, sprite:"./O/B5_2.png"},{index:3, sprite:"./O/B5_3.png"},{index:4, sprite:"./O/B5_4.png"},{index:5, sprite:"./O/B5_5.png"},{index:6, sprite:"./O/B5_6.png"}]},
  {N:"B6", Q:"./Q/B6.png", A:"3", O:[{index:1, sprite:"./O/B6_1.png"},{index:2, sprite:"./O/B6_2.png"},{index:3, sprite:"./O/B6_3.png"},{index:4, sprite:"./O/B6_4.png"},{index:5, sprite:"./O/B6_5.png"},{index:6, sprite:"./O/B6_6.png"}]},
  {N:"B7", Q:"./Q/B7.png", A:"5", O:[{index:1, sprite:"./O/B7_1.png"},{index:2, sprite:"./O/B7_2.png"},{index:3, sprite:"./O/B7_3.png"},{index:4, sprite:"./O/B7_4.png"},{index:5, sprite:"./O/B7_5.png"},{index:6, sprite:"./O/B7_6.png"}]},
  {N:"B8", Q:"./Q/B8.png", A:"6", O:[{index:1, sprite:"./O/B8_1.png"},{index:2, sprite:"./O/B8_2.png"},{index:3, sprite:"./O/B8_3.png"},{index:4, sprite:"./O/B8_4.png"},{index:5, sprite:"./O/B8_5.png"},{index:6, sprite:"./O/B8_6.png"}]},
  {N:"B9", Q:"./Q/B9.png", A:"4", O:[{index:1, sprite:"./O/B9_1.png"},{index:2, sprite:"./O/B9_2.png"},{index:3, sprite:"./O/B9_3.png"},{index:4, sprite:"./O/B9_4.png"},{index:5, sprite:"./O/B9_5.png"},{index:6, sprite:"./O/B9_6.png"}]},
  {N:"B10", Q:"./Q/B10.png", A:"3", O:[{index:1, sprite:"./O/B10_1.png"},{index:2, sprite:"./O/B10_2.png"},{index:3, sprite:"./O/B10_3.png"},{index:4, sprite:"./O/B10_4.png"},{index:5, sprite:"./O/B10_5.png"},{index:6, sprite:"./O/B10_6.png"}]},
  {N:"B11", Q:"./Q/B11.png", A:"4", O:[{index:1, sprite:"./O/B11_1.png"},{index:2, sprite:"./O/B11_2.png"},{index:3, sprite:"./O/B11_3.png"},{index:4, sprite:"./O/B11_4.png"},{index:5, sprite:"./O/B11_5.png"},{index:6, sprite:"./O/B11_6.png"}]},
  {N:"B12", Q:"./Q/B12.png", A:"5", O:[{index:1, sprite:"./O/B12_1.png"},{index:2, sprite:"./O/B12_2.png"},{index:3, sprite:"./O/B12_3.png"},{index:4, sprite:"./O/B12_4.png"},{index:5, sprite:"./O/B12_5.png"},{index:6, sprite:"./O/B12_6.png"}]},

  {N:"C1", Q:"./Q/C1.png", A:"8", O:[{index:1, sprite:"./O/C1_1.png"},{index:2, sprite:"./O/C1_2.png"},{index:3, sprite:"./O/C1_3.png"},{index:4, sprite:"./O/C1_4.png"},{index:5, sprite:"./O/C1_5.png"},{index:6, sprite:"./O/C1_6.png"}, {index:7, sprite:"./O/C1_7.png"}, {index:8, sprite:"./O/C1_8.png"}]},
  {N:"C2", Q:"./Q/C2.png", A:"2", O:[{index:1, sprite:"./O/C2_1.png"},{index:2, sprite:"./O/C2_2.png"},{index:3, sprite:"./O/C2_3.png"},{index:4, sprite:"./O/C2_4.png"},{index:5, sprite:"./O/C2_5.png"},{index:6, sprite:"./O/C2_6.png"}, {index:7, sprite:"./O/C2_7.png"}, {index:8, sprite:"./O/C2_8.png"}]},
  {N:"C3", Q:"./Q/C3.png", A:"3", O:[{index:1, sprite:"./O/C3_1.png"},{index:2, sprite:"./O/C3_2.png"},{index:3, sprite:"./O/C3_3.png"},{index:4, sprite:"./O/C3_4.png"},{index:5, sprite:"./O/C3_5.png"},{index:6, sprite:"./O/C3_6.png"}, {index:7, sprite:"./O/C3_7.png"}, {index:8, sprite:"./O/C3_8.png"}]},
  {N:"C4", Q:"./Q/C4.png", A:"8", O:[{index:1, sprite:"./O/C4_1.png"},{index:2, sprite:"./O/C4_2.png"},{index:3, sprite:"./O/C4_3.png"},{index:4, sprite:"./O/C4_4.png"},{index:5, sprite:"./O/C4_5.png"},{index:6, sprite:"./O/C4_6.png"}, {index:7, sprite:"./O/C4_7.png"}, {index:8, sprite:"./O/C4_8.png"}]},
  {N:"C5", Q:"./Q/C5.png", A:"7", O:[{index:1, sprite:"./O/C5_1.png"},{index:2, sprite:"./O/C5_2.png"},{index:3, sprite:"./O/C5_3.png"},{index:4, sprite:"./O/C5_4.png"},{index:5, sprite:"./O/C5_5.png"},{index:6, sprite:"./O/C5_6.png"}, {index:7, sprite:"./O/C5_7.png"}, {index:8, sprite:"./O/C5_8.png"}]},
  {N:"C6", Q:"./Q/C6.png", A:"4", O:[{index:1, sprite:"./O/C6_1.png"},{index:2, sprite:"./O/C6_2.png"},{index:3, sprite:"./O/C6_3.png"},{index:4, sprite:"./O/C6_4.png"},{index:5, sprite:"./O/C6_5.png"},{index:6, sprite:"./O/C6_6.png"}, {index:7, sprite:"./O/C6_7.png"}, {index:8, sprite:"./O/C6_8.png"}]},
  {N:"C7", Q:"./Q/C7.png", A:"5", O:[{index:1, sprite:"./O/C7_1.png"},{index:2, sprite:"./O/C7_2.png"},{index:3, sprite:"./O/C7_3.png"},{index:4, sprite:"./O/C7_4.png"},{index:5, sprite:"./O/C7_5.png"},{index:6, sprite:"./O/C7_6.png"}, {index:7, sprite:"./O/C7_7.png"}, {index:8, sprite:"./O/C7_8.png"}]},
  {N:"C8", Q:"./Q/C8.png", A:"1", O:[{index:1, sprite:"./O/C8_1.png"},{index:2, sprite:"./O/C8_2.png"},{index:3, sprite:"./O/C8_3.png"},{index:4, sprite:"./O/C8_4.png"},{index:5, sprite:"./O/C8_5.png"},{index:6, sprite:"./O/C8_6.png"}, {index:7, sprite:"./O/C8_7.png"}, {index:8, sprite:"./O/C8_8.png"}]},
  {N:"C9", Q:"./Q/C9.png", A:"7", O:[{index:1, sprite:"./O/C9_1.png"},{index:2, sprite:"./O/C9_2.png"},{index:3, sprite:"./O/C9_3.png"},{index:4, sprite:"./O/C9_4.png"},{index:5, sprite:"./O/C9_5.png"},{index:6, sprite:"./O/C9_6.png"}, {index:7, sprite:"./O/C9_7.png"}, {index:8, sprite:"./O/C9_8.png"}]},
  {N:"C10", Q:"./Q/C10.png", A:"6", O:[{index:1, sprite:"./O/C10_1.png"},{index:2, sprite:"./O/C10_2.png"},{index:3, sprite:"./O/C10_3.png"},{index:4, sprite:"./O/C10_4.png"},{index:5, sprite:"./O/C10_5.png"},{index:6, sprite:"./O/C10_6.png"}, {index:7, sprite:"./O/C10_7.png"}, {index:8, sprite:"./O/C10_8.png"}]},
  {N:"C11", Q:"./Q/C11.png", A:"1", O:[{index:1, sprite:"./O/C11_1.png"},{index:2, sprite:"./O/C11_2.png"},{index:3, sprite:"./O/C11_3.png"},{index:4, sprite:"./O/C11_4.png"},{index:5, sprite:"./O/C11_5.png"},{index:6, sprite:"./O/C11_6.png"}, {index:7, sprite:"./O/C11_7.png"}, {index:8, sprite:"./O/C11_8.png"}]},
  {N:"C12", Q:"./Q/C12.png", A:"2", O:[{index:1, sprite:"./O/C12_1.png"},{index:2, sprite:"./O/C12_2.png"},{index:3, sprite:"./O/C12_3.png"},{index:4, sprite:"./O/C12_4.png"},{index:5, sprite:"./O/C12_5.png"},{index:6, sprite:"./O/C12_6.png"}, {index:7, sprite:"./O/C12_7.png"}, {index:8, sprite:"./O/C12_8.png"}]},

  {N:"D1", Q:"./Q/D1.png", A:"3", O:[{index:1, sprite:"./O/D1_1.png"},{index:2, sprite:"./O/D1_2.png"},{index:3, sprite:"./O/D1_3.png"},{index:4, sprite:"./O/D1_4.png"},{index:5, sprite:"./O/D1_5.png"},{index:6, sprite:"./O/D1_6.png"}, {index:7, sprite:"./O/D1_7.png"}, {index:8, sprite:"./O/D1_8.png"}]},
  {N:"D2", Q:"./Q/D2.png", A:"4", O:[{index:1, sprite:"./O/D2_1.png"},{index:2, sprite:"./O/D2_2.png"},{index:3, sprite:"./O/D2_3.png"},{index:4, sprite:"./O/D2_4.png"},{index:5, sprite:"./O/D2_5.png"},{index:6, sprite:"./O/D2_6.png"}, {index:7, sprite:"./O/D2_7.png"}, {index:8, sprite:"./O/D2_8.png"}]},
  {N:"D3", Q:"./Q/D3.png", A:"3", O:[{index:1, sprite:"./O/D3_1.png"},{index:2, sprite:"./O/D3_2.png"},{index:3, sprite:"./O/D3_3.png"},{index:4, sprite:"./O/D3_4.png"},{index:5, sprite:"./O/D3_5.png"},{index:6, sprite:"./O/D3_6.png"}, {index:7, sprite:"./O/D3_7.png"}, {index:8, sprite:"./O/D3_8.png"}]},
  {N:"D4", Q:"./Q/D4.png", A:"7", O:[{index:1, sprite:"./O/D4_1.png"},{index:2, sprite:"./O/D4_2.png"},{index:3, sprite:"./O/D4_3.png"},{index:4, sprite:"./O/D4_4.png"},{index:5, sprite:"./O/D4_5.png"},{index:6, sprite:"./O/D4_6.png"}, {index:7, sprite:"./O/D4_7.png"}, {index:8, sprite:"./O/D4_8.png"}]},
  {N:"D5", Q:"./Q/D5.png", A:"8", O:[{index:1, sprite:"./O/D5_1.png"},{index:2, sprite:"./O/D5_2.png"},{index:3, sprite:"./O/D5_3.png"},{index:4, sprite:"./O/D5_4.png"},{index:5, sprite:"./O/D5_5.png"},{index:6, sprite:"./O/D5_6.png"}, {index:7, sprite:"./O/D5_7.png"}, {index:8, sprite:"./O/D5_8.png"}]},
  {N:"D6", Q:"./Q/D6.png", A:"6", O:[{index:1, sprite:"./O/D6_1.png"},{index:2, sprite:"./O/D6_2.png"},{index:3, sprite:"./O/D6_3.png"},{index:4, sprite:"./O/D6_4.png"},{index:5, sprite:"./O/D6_5.png"},{index:6, sprite:"./O/D6_6.png"}, {index:7, sprite:"./O/D6_7.png"}, {index:8, sprite:"./O/D6_8.png"}]},
  {N:"D7", Q:"./Q/D7.png", A:"5", O:[{index:1, sprite:"./O/D7_1.png"},{index:2, sprite:"./O/D7_2.png"},{index:3, sprite:"./O/D7_3.png"},{index:4, sprite:"./O/D7_4.png"},{index:5, sprite:"./O/D7_5.png"},{index:6, sprite:"./O/D7_6.png"}, {index:7, sprite:"./O/D7_7.png"}, {index:8, sprite:"./O/D7_8.png"}]},
  {N:"D8", Q:"./Q/D8.png", A:"4", O:[{index:1, sprite:"./O/D8_1.png"},{index:2, sprite:"./O/D8_2.png"},{index:3, sprite:"./O/D8_3.png"},{index:4, sprite:"./O/D8_4.png"},{index:5, sprite:"./O/D8_5.png"},{index:6, sprite:"./O/D8_6.png"}, {index:7, sprite:"./O/D8_7.png"}, {index:8, sprite:"./O/D8_8.png"}]},
  {N:"D9", Q:"./Q/D9.png", A:"1", O:[{index:1, sprite:"./O/D9_1.png"},{index:2, sprite:"./O/D9_2.png"},{index:3, sprite:"./O/D9_3.png"},{index:4, sprite:"./O/D9_4.png"},{index:5, sprite:"./O/D9_5.png"},{index:6, sprite:"./O/D9_6.png"}, {index:7, sprite:"./O/D9_7.png"}, {index:8, sprite:"./O/D9_8.png"}]},
  {N:"D10", Q:"./Q/D10.png", A:"2", O:[{index:1, sprite:"./O/D10_1.png"},{index:2, sprite:"./O/D10_2.png"},{index:3, sprite:"./O/D10_3.png"},{index:4, sprite:"./O/D10_4.png"},{index:5, sprite:"./O/D10_5.png"},{index:6, sprite:"./O/D10_6.png"}, {index:7, sprite:"./O/D10_7.png"}, {index:8, sprite:"./O/D10_8.png"}]},
  {N:"D11", Q:"./Q/D11.png", A:"5", O:[{index:1, sprite:"./O/D11_1.png"},{index:2, sprite:"./O/D11_2.png"},{index:3, sprite:"./O/D11_3.png"},{index:4, sprite:"./O/D11_4.png"},{index:5, sprite:"./O/D11_5.png"},{index:6, sprite:"./O/D11_6.png"}, {index:7, sprite:"./O/D11_7.png"}, {index:8, sprite:"./O/D11_8.png"}]},
  {N:"D12", Q:"./Q/D12.png", A:"6", O:[{index:1, sprite:"./O/D12_1.png"},{index:2, sprite:"./O/D12_2.png"},{index:3, sprite:"./O/D12_3.png"},{index:4, sprite:"./O/D12_4.png"},{index:5, sprite:"./O/D12_5.png"},{index:6, sprite:"./O/D12_6.png"}, {index:7, sprite:"./O/D12_7.png"}, {index:8, sprite:"./O/D12_8.png"}]},

  {N:"E1", Q:"./Q/E1.png", A:"7", O:[{index:1, sprite:"./O/E1_1.png"},{index:2, sprite:"./O/E1_2.png"},{index:3, sprite:"./O/E1_3.png"},{index:4, sprite:"./O/E1_4.png"},{index:5, sprite:"./O/E1_5.png"},{index:6, sprite:"./O/E1_6.png"}, {index:7, sprite:"./O/E1_7.png"}, {index:8, sprite:"./O/E1_8.png"}]},
  {N:"E2", Q:"./Q/E2.png", A:"6", O:[{index:1, sprite:"./O/E2_1.png"},{index:2, sprite:"./O/E2_2.png"},{index:3, sprite:"./O/E2_3.png"},{index:4, sprite:"./O/E2_4.png"},{index:5, sprite:"./O/E2_5.png"},{index:6, sprite:"./O/E2_6.png"}, {index:7, sprite:"./O/E2_7.png"}, {index:8, sprite:"./O/E2_8.png"}]},
  {N:"E3", Q:"./Q/E3.png", A:"8", O:[{index:1, sprite:"./O/E3_1.png"},{index:2, sprite:"./O/E3_2.png"},{index:3, sprite:"./O/E3_3.png"},{index:4, sprite:"./O/E3_4.png"},{index:5, sprite:"./O/E3_5.png"},{index:6, sprite:"./O/E3_6.png"}, {index:7, sprite:"./O/E3_7.png"}, {index:8, sprite:"./O/E3_8.png"}]},
  {N:"E4", Q:"./Q/E4.png", A:"2", O:[{index:1, sprite:"./O/E4_1.png"},{index:2, sprite:"./O/E4_2.png"},{index:3, sprite:"./O/E4_3.png"},{index:4, sprite:"./O/E4_4.png"},{index:5, sprite:"./O/E4_5.png"},{index:6, sprite:"./O/E4_6.png"}, {index:7, sprite:"./O/E4_7.png"}, {index:8, sprite:"./O/E4_8.png"}]},
  {N:"E5", Q:"./Q/E5.png", A:"1", O:[{index:1, sprite:"./O/E5_1.png"},{index:2, sprite:"./O/E5_2.png"},{index:3, sprite:"./O/E5_3.png"},{index:4, sprite:"./O/E5_4.png"},{index:5, sprite:"./O/E5_5.png"},{index:6, sprite:"./O/E5_6.png"}, {index:7, sprite:"./O/E5_7.png"}, {index:8, sprite:"./O/E5_8.png"}]},
  {N:"E6", Q:"./Q/E6.png", A:"5", O:[{index:1, sprite:"./O/E6_1.png"},{index:2, sprite:"./O/E6_2.png"},{index:3, sprite:"./O/E6_3.png"},{index:4, sprite:"./O/E6_4.png"},{index:5, sprite:"./O/E6_5.png"},{index:6, sprite:"./O/E6_6.png"}, {index:7, sprite:"./O/E6_7.png"}, {index:8, sprite:"./O/E6_8.png"}]},
  {N:"E7", Q:"./Q/E7.png", A:"2", O:[{index:1, sprite:"./O/E7_1.png"},{index:2, sprite:"./O/E7_2.png"},{index:3, sprite:"./O/E7_3.png"},{index:4, sprite:"./O/E7_4.png"},{index:5, sprite:"./O/E7_5.png"},{index:6, sprite:"./O/E7_6.png"}, {index:7, sprite:"./O/E7_7.png"}, {index:8, sprite:"./O/E7_8.png"}]},
  {N:"E8", Q:"./Q/E8.png", A:"4", O:[{index:1, sprite:"./O/E8_1.png"},{index:2, sprite:"./O/E8_2.png"},{index:3, sprite:"./O/E8_3.png"},{index:4, sprite:"./O/E8_4.png"},{index:5, sprite:"./O/E8_5.png"},{index:6, sprite:"./O/E8_6.png"}, {index:7, sprite:"./O/E8_7.png"}, {index:8, sprite:"./O/E8_8.png"}]},
  {N:"E9", Q:"./Q/E9.png", A:"1", O:[{index:1, sprite:"./O/E9_1.png"},{index:2, sprite:"./O/E9_2.png"},{index:3, sprite:"./O/E9_3.png"},{index:4, sprite:"./O/E9_4.png"},{index:5, sprite:"./O/E9_5.png"},{index:6, sprite:"./O/E9_6.png"}, {index:7, sprite:"./O/E9_7.png"}, {index:8, sprite:"./O/E9_8.png"}]},
  {N:"E10", Q:"./Q/E10.png", A:"6", O:[{index:1, sprite:"./O/E10_1.png"},{index:2, sprite:"./O/E10_2.png"},{index:3, sprite:"./O/E10_3.png"},{index:4, sprite:"./O/E10_4.png"},{index:5, sprite:"./O/E10_5.png"},{index:6, sprite:"./O/E10_6.png"}, {index:7, sprite:"./O/E10_7.png"}, {index:8, sprite:"./O/E10_8.png"}]},
  {N:"E11", Q:"./Q/E11.png", A:"3", O:[{index:1, sprite:"./O/E11_1.png"},{index:2, sprite:"./O/E11_2.png"},{index:3, sprite:"./O/E11_3.png"},{index:4, sprite:"./O/E11_4.png"},{index:5, sprite:"./O/E11_5.png"},{index:6, sprite:"./O/E11_6.png"}, {index:7, sprite:"./O/E11_7.png"}, {index:8, sprite:"./O/E11_8.png"}]},
  {N:"E12", Q:"./Q/E12.png", A:"5", O:[{index:1, sprite:"./O/E12_1.png"},{index:2, sprite:"./O/E12_2.png"},{index:3, sprite:"./O/E12_3.png"},{index:4, sprite:"./O/E12_4.png"},{index:5, sprite:"./O/E12_5.png"},{index:6, sprite:"./O/E12_6.png"}, {index:7, sprite:"./O/E12_7.png"}, {index:8, sprite:"./O/E12_8.png"}]},
]

//Styles
const grid_container = {display: "grid", gridTemplateColumns: "auto auto auto", padding: "10px"}
const option_image = {width:"8em", height:"5em"}
const card_body = {width: "100%"}
const card = {width:"26em", heigth:"10em", margin:"1em", minWidth:"27em"}
const card_image = {width:"22em", heigth:"10em", margin:"auto"}
const card_header = {ok:{backgroundColor:"lightgreen", height:"3em"},pending:{backgroundColor:"pink", height:"3em"}}
const flex_box = {display: "flex", flexWrap:"wrap", padding: "10px"}



function Item({ source, selecting, userResponse}){

  return(
    <>
      <div className="card" style={card}>
        <div className="card-header" style={userResponse[source.N]? card_header.ok : card_header.pending} ></div>
        <img src={source.Q}  className="card-img-top" style={card_image}/>
        <div className="card-body" style={card_body}>
          <div style={grid_container}>
          {
            source.O.map((option)=> 
              <ul key={`opt-${source.N}-${option.index}`} className="list-group list-group-flush">
                <input type="radio" name={source.N} id={`opt-${source.N}-${option.index}`} value={option.index} onChange={selecting} />
                <label htmlFor={`opt-${source.N}-${option.index}`}><img style={option_image} src={option.sprite} /> </label>
              </ul>)
          }
          </div>
        </div>
      </div>
    </>
  )
}



const CountdownTimer = ({ initialSeconds, timeout, waitFor}) => {
const [seconds, setSeconds] = useState(initialSeconds);

useEffect(() => {
  // Exit early if countdown is finished
  if (seconds <= 0) {
      timeout()
      console.log(waitFor)
      
  return;
  }

  if (waitFor) return;

  // Set up the timer
  const timer = setInterval(() => {
  setSeconds((prevSeconds) => prevSeconds - 1);
  }, 1000);

  // Clean up the timer
  return () => clearInterval(timer);
}, [seconds]);

// Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
  .toString()
  .padStart(2, `0`);
  const seconds = (timeInSeconds % 60).toString().padStart(2, `0`);
  return `${minutes}:${seconds}`;
};

const sticky = { position: "sticky", top: "20px"}

return (
    <>
      <p className="navbar-brand">{formatTime(seconds)}</p>
    </>
);
};




function Form( {source, age} ){
  

  const [selectedOptions, setSelectedOptions] = useState({proceed: false, score:0, completed:false});
  const confirm = useRef()
  // const [timer, setTimer] = useState(10)

  function submitForm(){
    confirm.current.click();
  }

  function submit(e){
    e.preventDefault();

    let total = 0;
    for(let each of source){
      const correctAnswer  = each.A;
      const selectedAnswer = selectedOptions[each.N];
      if (selectedAnswer === correctAnswer){
        total+=1;
      }
    }

    setSelectedOptions({...selectedOptions, score:total, completed:true })
  }

    function formHandling(question){
    console.log(question.target.name, question.target.value)
    setSelectedOptions({...selectedOptions, [question.target.name]:question.target.value})
  }

  function toggleWarning(){
    setSelectedOptions({...selectedOptions, proceed:!selectedOptions.proceed})
  }


 return (
    <>

      <form onSubmit={submit} >

        <div style={flex_box}>
        {source.map((question) => (
          <Item
            key={question.N}
            source={question}
            selecting={formHandling}
            userResponse={selectedOptions}
          />
        ))}
        </div>

        <button type="submit"  ref={confirm} style={{display:"none"}}>alt</button>
      </form>

      <nav className="navbar fixed-bottom navbar-dark bg-dark" style={{height:"4em"}}>


        <div className="d-flex justify-content-evenly w-100">
        <div className="navbar-item">  
          <CountdownTimer initialSeconds={10} timeout={submitForm} waitFor={selectedOptions.completed}  />
        </div>

        <div className="navbar-item" style={flex_box}>  
        {selectedOptions.completed? <>ok</> :
          <>
          
          {selectedOptions.proceed? 
              <>
                <button className="btn btn-success" onClick={submitForm}>Confirm submission</button> 
                <button className="btn btn-danger" onClick={toggleWarning}>Not yet</button>
              </>
                : 
                <button className="btn btn-primary" onClick={toggleWarning}>Complete Quiz!</button>}


          </>}
        </div>

          <p className="navbar-item text-white navbar-brand"> Score: {selectedOptions.score} Age: {age}</p>
          </div>
      </nav>
    </>
  );}





function App() {
  const [initial, setInitials] = useState({isReady:false, age:0})
  function toggling(){
    if (initial.age > 0) setInitials({...initial, isReady:!initial.isReady})
  }
  function setAge(e){
    console.log(e.target.value)
    e.preventDefault()
    setInitials({...initial, age:e.target.value})
  }

return (
  <>
    {initial.isReady?
      <Form source={S} age={initial.age} />:
      <>
        <h1>Test will begin. Instructions:...</h1>
        <form>
        <button  type="submit" onClick={toggling}>Begin Test</button>
          <input type="number" onChange={setAge} required/>
        </form>

      </>}



  </>)}




createRoot(document.getElementById("root")).render(<App />);
