import React from 'react';
import { render, screen } from "@testing-library/react";
import Footer from "../page/home/footer";
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from "react-router-dom";
test("List renders successfully", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  expect(screen.getByText(/آنلاین شاپ/i)).toBeInTheDocument();
});