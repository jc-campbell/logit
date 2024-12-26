# Logit

### Overview
Logit will be a social media platform where users can post forecasts about real-world events. Each post will include a prediction with probabilities and be scored based on the shared information (KL divergence) between their forecasts and the outcomes of the events. The initial development will focus on a web application.

### Tools, Technologies, and Libraries

#### **Frontend Development**
- **Framework**: React.js for building a responsive and interactive user interface.
- **State Management**: Redux or Context API for managing application state.
- **Styling**: Tailwind CSS for quick and customizable styling.
- **Charting Library**: D3.js or Chart.js for visualizing forecast data and scoring metrics.
- **Routing**: React Router for navigation.

#### **Backend Development**
- **Framework**: Node.js with Express for scalable and efficient API development.
- **Database**: PostgreSQL for relational data storage (e.g., users, posts, event outcomes).
- **Forecast Scoring**: Python-based microservices for computing KL divergence and other metrics using libraries such as NumPy and SciPy.
- **Authentication**: Auth0 or Passport.js for user authentication and account management.

#### **Data and Event Management**
- **Event Data Sources**: APIs like PredictIt, FiveThirtyEight, or public event tracking APIs to provide real-world event outcomes.
- **Task Scheduling**: Celery with Redis for periodic tasks like fetching event outcomes and updating scores.

#### **Infrastructure**
- **Hosting**: AWS, Azure, or Google Cloud for deploying the web app and backend services.
- **Containerization**: Docker for packaging and deploying the application.
- **CI/CD**: GitHub Actions for continuous integration and deployment.
- **Monitoring**: Sentry for error monitoring and DataDog for performance monitoring.

#### **Development Workflow**
- **Version Control**: GitHub for code repository and collaboration.
- **Issue Tracking**: Jira or GitHub Projects for task management.
- **Testing Frameworks**:
  - Jest and React Testing Library for frontend testing.
  - Mocha/Chai for backend API testing.
  - Postman for API testing and documentation.

### Project Structure

#### **1. Frontend**
- **Components**: Modular React components for user interface elements.
- **Pages**:
  - Home Feed: Displays a timeline of user posts.
  - Post Forecast: A form for users to create a new forecast.
  - User Profile: Displays user details and forecast history.
  - Leaderboard: Shows top users by forecast accuracy.

#### **2. Backend**
- **API Endpoints**:
  - `GET /posts`: Retrieve posts and forecasts.
  - `POST /posts`: Submit a new forecast.
  - `GET /scores`: Retrieve user scores.
  - `POST /events`: Add or update real-world event data.
- **Microservices**:
  - Scoring Service: Computes KL divergence and other metrics.
  - Event Update Service: Fetches event outcomes periodically.

#### **3. Database**
- Tables:
  - **Users**: User information and authentication details.
  - **Posts**: Forecast data and metadata.
  - **Events**: Details of real-world events.
  - **Scores**: User scores and ranking details.

#### **4. Data Processing**
- **Workflow**:
  - Users submit forecasts with probabilities.
  - Real-world outcomes are fetched from external APIs.
  - Backend services compute the divergence between forecasts and actual outcomes.
  - Scores are updated in the database and displayed on the platform.

### Development Phases

#### **Phase 1: MVP**
- Build a basic web app with user authentication, post creation, and leaderboard.
- Implement a backend API with database integration.
- Develop a simple scoring mechanism and event outcome processing.

#### **Phase 2: Feature Expansion**
- Add advanced visualization for forecasts and scoring.
- Enable social features like comments, likes, and sharing.
- Introduce detailed user analytics and reporting.

#### **Phase 3: Optimization and Scaling**
- Optimize database queries and scoring algorithms.
- Scale infrastructure for increased user load.
- Introduce mobile app support.

### Summary
This proposal outlines the tools, technologies, and structure needed to create Logit, a social media platform that uniquely combines forecasting with social interaction. The phased approach ensures that the platform is built incrementally, focusing on core functionality before adding advanced features and scaling.

