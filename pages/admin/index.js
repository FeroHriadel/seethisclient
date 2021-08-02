import React, { useEffect, useState } from 'react';
import { FaFolder, FaTags, FaUser, FaFileAlt } from 'react-icons/fa';
import Heading from "../../components/Heading";
import Bricks from "../../components/Bricks";
import Switch from "../../components/Switch";
import Menu from "../../components/Menu";
import BlackCircle from '../../components/BlackCircle';
import Link from 'next/link';
import ProtectAdminRoute from '../../components/ProtectAdminRoute';



export default function AdminIndexPage() {
    return (
        <ProtectAdminRoute>
            <div className='admin-index-page'>
                <Bricks />
                <Switch />
                <Menu />

                <div className='container'>
                    <Heading>
                        <span>Admin </span> Dashboard
                    </Heading>

                    <div className='content-box'>
                        <ul className='admin-menu'>
                            <Link href='/admin/categories'>
                                <li>
                                    <BlackCircle>
                                        <p style={{color: 'var(--white-color)', fontSize: '25px'}}> <FaFolder /> </p>
                                    </BlackCircle>
                                    <h3>Manage categories</h3>
                                </li>
                            </Link>
                            <Link href='/admin/tags'>
                                <li>
                                    <BlackCircle>
                                        <p style={{color: 'var(--white-color)', fontSize: '25px'}}> <FaTags /> </p>
                                    </BlackCircle>
                                    <h3>Manage tags</h3>
                                </li>
                            </Link>
                            <Link href='/admin/users'>
                                <li>
                                    <BlackCircle>
                                        <p style={{color: 'var(--white-color)', fontSize: '25px'}}> <FaUser /> </p>
                                    </BlackCircle>
                                    <h3>Manage users</h3>
                                </li>
                            </Link>
                            <Link href='/admin/spots'>
                                <li>
                                    <BlackCircle>
                                        <p style={{color: 'var(--white-color)', fontSize: '25px'}}> <FaFileAlt /> </p>
                                    </BlackCircle>
                                    <h3>Manage spots</h3>
                                </li>
                            </Link>
                        </ul>
                        <img src='images/admin.svg' />
                    </div>
                </div>
            </div>
        </ProtectAdminRoute>
    )
}
