// src/pages/Home.js
import React from 'react';
import Banner from '../components/Banner';
import ProductCategories from '../components/ProductCategories';
import ProductHighlight from '../components/ProductHighlight';
import ReviewFAQ from '../components/ReviewFAQ';
import { Helmet } from 'react-helmet';
import  ClientReviews from '../components/ClientReview'
import HowItWorks from '../components/HowWorks'
import FeaturesSection from '../components/Feature';
import StatisticsSection from '../components/StatSection'
const Home = () => {
  return (
    <div className=' bg-gray-100  dark:bg-gray-900 min-h-screen flex flex-col'>
      <Helmet>
        <title>Home</title>
        <meta name="home" content="Home page" />
      </Helmet>
      <Banner />
      <StatisticsSection/>
      <ProductCategories />
      <ProductHighlight />
      <ClientReviews/>
      <HowItWorks/>
      <FeaturesSection/>
      <ReviewFAQ />
      
    </div>
  );
};

export default Home;
