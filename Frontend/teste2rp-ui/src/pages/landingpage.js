import { Component } from 'react';
import { useState, useEffect } from 'react';
import '../assets/css/landingpage.css';
import Header from '../componentes/header/header'
import { Link } from 'react-router-dom';
import { API } from '../services/api';

export default function LandingPage() {

  return (
    <div>
      <Header />
      <div className="fundo">

        <section className='banner'>
          <div className='container-banner'>
            <div className='box-banner'>
             <h1>A melhor solução de automatização para qualquer empresa.</h1>
             <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
             <Link to="/login"><button className='btn-conhecer'>Conhecer</button></Link>
            </div>
          </div>
        </section>
      </div>
    </div >
  );
}

