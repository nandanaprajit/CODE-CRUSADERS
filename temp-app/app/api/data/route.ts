import { NextResponse } from "next/server";

export async function GET() {
  const churnData = [
    { customerId: "CUST-1001", tenureMonths: 12, contractType: "Month-to-Month", monthlyCharges: 65.5, churn: true, customerType: "Standard" },
    { customerId: "CUST-1002", tenureMonths: 48, contractType: "Two-Year", monthlyCharges: 89.2, churn: false, customerType: "Enterprise" },
    { customerId: "CUST-1003", tenureMonths: 3, contractType: "Month-to-Month", monthlyCharges: 45.0, churn: true, customerType: "Standard" },
    { customerId: "CUST-1004", tenureMonths: 24, contractType: "One-Year", monthlyCharges: 70.1, churn: false, customerType: "Legacy" },
    { customerId: "CUST-1005", tenureMonths: null, contractType: "Month-to-Month", monthlyCharges: 55.4, churn: true, customerType: "Standard" },
    { customerId: "CUST-1006", tenureMonths: 36, contractType: "Two-Year", monthlyCharges: 110.0, churn: false, customerType: "Enterprise" },
    { customerId: "CUST-1007", tenureMonths: 6, contractType: "Month-to-Month", monthlyCharges: 95.8, churn: true, customerType: "Legacy" },
    { customerId: "CUST-1008", tenureMonths: 18, contractType: "One-Year", monthlyCharges: null, churn: false, customerType: "Standard" },
    { customerId: "CUST-1009", tenureMonths: 60, contractType: "Two-Year", monthlyCharges: 115.5, churn: false, customerType: "Enterprise" },
    { customerId: "CUST-1010", tenureMonths: 1, contractType: "Month-to-Month", monthlyCharges: 40.2, churn: true, customerType: "Standard" }
  ];

  return NextResponse.json({
    totalRows: churnData.length,
    dataset: churnData,
  });
}