/**
 * Page Objects Index
 * Central export point for all page objects
 */

// Import all page objects
import BasePage from './BasePage.js';
import TodoPage from './pages/TodoPage.js';
import ActionsPage from './pages/ActionsPage.js';
import QueryingPage from './pages/QueryingPage.js';
import NetworkRequestsPage from './pages/NetworkRequestsPage.js';
import AliasingPage from './pages/AliasingPage.js';
import AssertionsPage from './pages/AssertionsPage.js';
import ConnectorsPage from './pages/ConnectorsPage.js';
import CookiesPage from './pages/CookiesPage.js';
import LocationPage from './pages/LocationPage.js';
import TraversalPage from './pages/TraversalPage.js';
import UtilitiesPage from './pages/UtilitiesPage.js';
import CypressApiPage from './pages/CypressApiPage.js';
import FilesPage from './pages/FilesPage.js';
import MiscPage from './pages/MiscPage.js';
import NavigationPage from './pages/NavigationPage.js';
import SpiesStubsClocksPage from './pages/SpiesStubsClocksPage.js';
import StoragePage from './pages/StoragePage.js';

// Export all page objects
export {
  BasePage,
  TodoPage,
  ActionsPage,
  QueryingPage,
  NetworkRequestsPage,
  AliasingPage,
  AssertionsPage,
  ConnectorsPage,
  CookiesPage,
  LocationPage,
  TraversalPage,
  UtilitiesPage,
  CypressApiPage,
  FilesPage,
  MiscPage,
  NavigationPage,
  SpiesStubsClocksPage,
  StoragePage
};

// Default export with all page objects as properties
export default {
  BasePage,
  TodoPage,
  ActionsPage,
  QueryingPage,
  NetworkRequestsPage,
  AliasingPage,
  AssertionsPage,
  ConnectorsPage,
  CookiesPage,
  LocationPage,
  TraversalPage,
  UtilitiesPage,
  CypressApiPage,
  FilesPage,
  MiscPage,
  NavigationPage,
  SpiesStubsClocksPage,
  StoragePage
};