import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import QuizIcon from '@mui/icons-material/Quiz';
import BiotechIcon from '@mui/icons-material/Biotech';
import PieChart from "../../components/PieChart";
import Chart1 from "../../components/Chart1";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userCount, setUserCount] = useState(null);
  const [profCount, setProfCount] = useState(null);
  const [examCount, setExamCount] = useState(null);
  const [filiereCount, setFiliereCount] = useState(null);
  const [examList, setExamList] = useState([]);

  useEffect(() => {
    fetch("/api/auth/users")
    .then((response) => response.json())
    .then((data) => {
      const usersWithRoleEtudiant = data.filter(user => user.roles.some(role => role.name === "ROLE_ETUDIANT"));
      setUserCount(usersWithRoleEtudiant.length);
    })
    .catch((error) => console.log(error));
    fetch("/api/auth/users")
    .then((response) => response.json())
    .then((data) => {
      const usersWithRoleEtudiant = data.filter(user => user.roles.some(role => role.name === "ROLE_PROF"));
      setProfCount(usersWithRoleEtudiant.length);
    })
    .catch((error) => console.log(error));
  
    fetch("/api/exams/all")
      .then((response) => response.json())
      .then((data) => {setExamCount(data.length);
      setExamList(data);
      })
      .catch((error) => console.log(error));

      fetch("/api/filieres/all")
      .then((response) => response.json())
      .then((data) => setFiliereCount(data.length))
      .catch((error) => console.log(error));
  }, []);
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString().split("T")[0];
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("http://localhost:8080/api/excel/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // File upload successful
          setUploadStatus("success");
        } else {
          // File upload failed
          setUploadStatus("failure");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          component="label"
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Upload List Users
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Button>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            ml: 2
          }}
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Box>
      {uploadStatus && (
        <Typography mt={2} color={uploadStatus === "success" ? "green" : "red"}>
          {uploadStatus === "success" ? "File uploaded successfully!" : "File upload failed."}
        </Typography>
      )}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
      {userCount !== null ? (
        <StatBox
          title={userCount}
          subtitle="Number of Students"
          progress="0.75"
          increase="+14%"
          icon={
            <PersonAddIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      ) : (
        <p>Loading...</p>
      )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
            {examCount !== null ? (
        <StatBox
          title={examCount}
            subtitle="Number of Exams"
            progress="0.5"
            increase="+5%"
          icon={
            <QuizIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      ) : (
        <p>Loading...</p>
      )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        {profCount !== null ? (
        <StatBox
          title={profCount}
          subtitle="Number of Professeur"
          progress="0.60"
          increase="+10%"
          icon={
            <PersonAddIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      ) : (
        <p>Loading...</p>
      )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {filiereCount !== null ? (
        <StatBox
          title={filiereCount}
          subtitle="Number of Filiere"
          progress="0.40"
          increase="+0%"
          icon={
            <BiotechIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      ) : (
        <p>Loading...</p>
      )}
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                List Of Users
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {profCount+userCount}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
          <PieChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Exams
            </Typography>
          </Box>
          {examList.map((exam, i) => (
        <Box
          key={`${exam.id}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="4px solid primary"
          p="15px"
        >
          <Box>
            <Typography color="green" variant="h5" fontWeight="600">
              {exam.id}
            </Typography>
            <Typography color="grey">{exam.nom}</Typography>
          </Box>
          <Box color="grey">{formatDate(exam.dateTime)}</Box>
          <Box
            backgroundColor="green"
            p="5px 10px"
            borderRadius="4px"
          >
            {exam.duree}
          </Box>
        </Box>
      ))}
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Chart Of Exams
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {examCount}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-30px 0 0 0">
          <BarChart isDashboard={true} />
          </Box>
        </Box>
      
</Box>
    </Box>
  );
};

export default Dashboard;
