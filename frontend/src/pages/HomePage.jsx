import React from 'react';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import Cover from '../components/Cover';
import TrustBadges from '../components/TrustBadges';
import FeaturedProducts from '../components/FeaturedProducts';
import NewArrivals from '../components/NewArrivals';
import Newsletter from '../components/Newsletter';
import SocialSection from '../components/SocialSection';

const HomePage = () => (
  <>
    <NotificationBar />
    <SearchBar />
    <NavButtons />
    <Cover />
    <TrustBadges />
    <FeaturedProducts />
    <NewArrivals />
    <Newsletter />
    <SocialSection />
  </>
);
export default HomePage;