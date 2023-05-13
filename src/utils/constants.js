import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text:
      'Our mission is to simplify the domain of e-commerce to bring out the best user experience to our customers through our innovations in design,tech and services ',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text:
      'Our vision is to make earth a better place for life. Through our innovations and by the efforts of our dedicated workforce we will achieve the desired ideals.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text:
      'Shop_Online is the name of its proprietary e-commerce platform for online stores and retail point-of-sale systems.[3] The Shop_Online platform offers online retailers a suite of services including payments, marketing, shipping and customer engagement tools.',
  },
]


export const products_url = 'https://fakestoreapi.com/products'


export const single_product_url = `https://fakestoreapi.com/products`
