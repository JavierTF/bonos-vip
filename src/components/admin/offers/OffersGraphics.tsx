"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Offer {
  id: string;
  title: string;
  category: string;
  price: number;
  discount?: number;
}

interface OffersGraphicsProps {
  offers: Offer[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function OffersGraphics({ offers }: OffersGraphicsProps) {
  const categoryData = React.useMemo(() => {
    const categories = offers.reduce((acc, offer) => {
      acc[offer.category] = (acc[offer.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  }, [offers]);

  const priceRangeData = React.useMemo(() => {
    const ranges = {
      '0-50': 0,
      '51-100': 0,
      '101-200': 0,
      '201-500': 0,
      '500+': 0
    };

    offers.forEach(offer => {
      if (offer.price <= 50) ranges['0-50']++;
      else if (offer.price <= 100) ranges['51-100']++;
      else if (offer.price <= 200) ranges['101-200']++;
      else if (offer.price <= 500) ranges['201-500']++;
      else ranges['500+']++;
    });

    return Object.entries(ranges).map(([range, count]) => ({
      range,
      count
    }));
  }, [offers]);

  const discountData = React.useMemo(() => {
    return offers
      .filter(offer => offer.discount)
      .sort((a, b) => (a.price || 0) - (b.price || 0))
      .map(offer => ({
        name: offer.title.substring(0, 15) + (offer.title.length > 15 ? '...' : ''),
        price: offer.price,
        discount: offer.discount
      }));
  }, [offers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Offers by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceRangeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price vs Discount</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={discountData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="discount" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}