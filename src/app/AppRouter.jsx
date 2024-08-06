import _ from "lodash";
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Constants from "../config/constants";
import LoginPage from "./Components/auth/LoginPage";
import Secure from "./Components/auth/RequireAuth";
import { ProvideAuth } from "./Hooks/use-auth";

const Contacts = lazy(() => import("./Page/Contacts"));
const AboutUs = lazy(() => import("./Page/AboutUs"));
const Home = lazy(() => import("./Page/Home"));
const FileDispatch = lazy(() => import("./routes/FileDispatch"));
const PageWithTable = lazy(() => import("./routes/PageWithTable"));

const AppRouter = ({ children }) => (
    <ProvideAuth>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={children}>
                    <Route index element={<Home />} />

                    <Route path="view">
                        {_.toPairs(Constants.view).map(([key, config]) => (
                            <Route
                                key={key}
                                path={config.url.root}
                                element={
                                    <PageWithTable
                                        type={`view.${key}`}
                                        title={config.title}
                                    />
                                }
                            />
                        ))}
                    </Route>

                    <Route path="table">
                        {_.toPairs(Constants.table).map(([key, config]) => (
                            <Route
                                key={key}
                                path={config.url.root}
                                element={
                                    <PageWithTable
                                        type={`table.${key}`}
                                        title={config.title}
                                    />
                                }
                            >
                                <Route
                                    path="edit"
                                    element={
                                        <Secure
                                            element={
                                                <PageWithTable
                                                    type={`table.${key}`}
                                                    title={`Edit ${config.title.toLowerCase()}`}
                                                    isEditable={true}
                                                />
                                            }
                                        />
                                    }
                                />
                            </Route>
                        ))}
                    </Route>

                    <Route
                        path="file/submit"
                        element={<Secure element={<FileDispatch />} />}
                    />

                    <Route path="contacts" element={<Contacts />} />
                    <Route path="login" element={<LoginPage />} />

                    <Route path="about" element={<AboutUs />} />
                    <Route path="*" element={<p>There's nothing here!</p>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ProvideAuth>
);

export default AppRouter;
