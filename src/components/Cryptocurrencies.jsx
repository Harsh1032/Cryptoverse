import React, {useState, useEffect} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi'; 
import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {

  const count = simplified ? 10 : 100;               {/* This is for showimg top 10 crypto on homepage and 100 on cryptocurrency */}

  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);  

  const [cryptos, setCryptos] = useState([]);        {/*useState is empty because useEffect will implement like compuntdidmount */}

  const [ searchTerm, setSearchTerm ] = useState('');       

  useEffect(() => {

    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm)); 
    
    setCryptos(filteredData);

  }, [cryptosList, searchTerm]);

  if(isFetching) return <Loader/>;

  return (
    <>
      {!simplified && (                               
        <div className="search-crypto">                     {/* this for only showing input in the cryptocurrency page */}
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}

      <Row gutter = {[32,32]} className = "crypto-card-container">                              {/* gutter is used to give space */}
        {cryptos?.map((currency) => (
          <Col xs = {24} sm = {12} lg = {6} className = "crypto-card" key = {currency.uuid}>      {/* currency.id is used to go to the specific currency */}
            <Link key = {currency.uuid} to = {`/crypto/${currency.uuid}`}>
              <Card
                title = {`${currency.rank}. ${currency.name}`}
                extra = {<img className = 'crypto-image' src = {currency.iconUrl}/>}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p> 
                <p>Market Cap: {millify(currency.marketCap)}</p> 
                <p>Daily change: {currency.change}%</p> 
              </Card>
            </Link>
          </Col>
        ))}
      </Row> 
    </>
  )
}

export default Cryptocurrencies;