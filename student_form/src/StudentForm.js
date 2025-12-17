import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import axios from "axios";

const StudentForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [applyingAs, setApplyingAs] = useState("Individual");
  const [teamMembers, setTeamMembers] = useState([
    { fullName: "", email: "", mobile: "", gender: "", institution: "", degree: "", year: "" },
  ]);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => setCountries(res.data.data));
  }, []);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setDistricts([]);

    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", { country })
      .then((res) => setStates(res.data.data.states));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);

    axios
      .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country: selectedCountry,
        state,
      })
      .then((res) => setDistricts(res.data.data));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addMember = () => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, { fullName: "", email: "", mobile: "", gender: "", institution: "", degree: "", year: "" }]);
    }
  };

  const removeMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold text-success">Student Registration Portal</h2>
 
      <Card className="shadow-sm mt-4">
        <Card.Header className="bg-success text-white fw-bold">1. Personal Information</Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                <Form.Control />
              </Col>
              <Col md={6}>
                <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                <Form.Control />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                <Form.Control type="email" />
              </Col>
              <Col md={6}>
                <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
                <Form.Control placeholder="+91" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}><Form.Control type="date" /></Col>
              <Col md={3}>
                <Form.Select>
                  <option>Gender *</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select>
                  <option>Religion *</option>
                  <option>Hindu</option>
                  <option>Christian</option>
                  <option>Muslim</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select>
                  <option>Community *</option>
                  <option>OC</option>
                  <option>BC</option>
                  <option>MBC</option>
                  <option>SC / ST</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Card className="shadow-sm mt-4">
        <Card.Header className="bg-success text-white fw-bold">Are you in school or college?</Card.Header>
        <Card.Body>
          <Form.Check
            inline
            label="School"
            type="radio"
            name="institution"
            onChange={() => setInstitutionType("school")}
          />
          <Form.Check
            inline
            label="College"
            type="radio"
            name="institution"
            onChange={() => setInstitutionType("college")}
          />
        </Card.Body>
      </Card>

      {institutionType === "school" && (
        <Card className="shadow-sm mt-4">
          <Card.Header className="bg-success text-white fw-bold">2. Academic Details</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={3}><Form.Control placeholder="School Name" /></Col>
              <Col md={3}><Form.Control placeholder="Class / Grade" /></Col>
              <Col md={3}>
                <Form.Select>
                  <option>Medium</option>
                  <option>English</option>
                  <option>Tamil</option>
                </Form.Select>
              </Col>
              <Col md={3}><Form.Control placeholder="Board" /></Col>
            </Row>
            <Row>
              <Col md={3}><Form.Control placeholder="School Type" /></Col>
              <Col md={3}><Form.Control placeholder="District" /></Col>
              <Col md={3}><Form.Control placeholder="State" /></Col>
            </Row>
          </Card.Body>
        </Card>
      )}
      {institutionType === "college" && (
  <Card className="shadow-sm mt-4">
    <Card.Header className="bg-success text-white fw-bold">2. Academic Details</Card.Header>
    <Card.Body>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>College Name <span className="text-danger">*</span></Form.Label>
          <Form.Control 
            placeholder="Full name of college" 
            value={teamMembers[0].institution} 
            onChange={(e) => handleMemberChange(0, "institution", e.target.value)} 
          />
        </Col>
        <Col md={6}>
          <Form.Label>Department / Branch <span className="text-danger">*</span></Form.Label>
          <Form.Control placeholder="e.g. Computer Science" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Degree <span className="text-danger">*</span></Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>B.Tech</option>
            <option>B.Sc</option>
            <option>B.Com</option>
            <option>M.Tech</option>
            <option>M.Sc</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Label>Year of Study <span className="text-danger">*</span></Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </Form.Select>
        </Col>
      </Row>
    </Card.Body>
  </Card>
)}


      <Card className="shadow-sm mt-4">
        <Card.Header className="bg-success text-white fw-bold">3. Guardian & Address Details</Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={4}>
              <Form.Label>Parent / Guardian Name <span className="text-danger">*</span></Form.Label>
              <Form.Control placeholder="Name" />
            </Col>
            <Col md={4}>
              <Form.Label>Relationship <span className="text-danger">*</span></Form.Label>
              <Form.Select>
                <option>Choose...</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Guardian</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
              <Form.Control placeholder="Guardian's mobile" />
            </Col>
          </Row>

          <h6 className="fw-bold text-secondary mb-3">Permanent Address</h6>
          <Row>
            <Col md={4}>
              <Form.Label>Door No. / Street <span className="text-danger">*</span></Form.Label>
              <Form.Control placeholder="Address Line 1" />
            </Col>
            <Col md={4}>
              <Form.Label>District <span className="text-danger">*</span></Form.Label>
              <Form.Control />
            </Col>
            <Col md={4}>
              <Form.Label>Pincode <span className="text-danger">*</span></Form.Label>
              <Form.Control placeholder="6 digits" maxLength={6} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mt-4">
        <Card.Header className="bg-success text-white fw-bold">4. Startup / Idea Information</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>How are you applying? *</Form.Label>
            <div>
              <Form.Check
                inline
                label="Individual"
                type="radio"
                name="applyingAs"
                value="Individual"
                checked={applyingAs === "Individual"}
                onChange={(e) => setApplyingAs(e.target.value)}
              />
              <Form.Check
                inline
                label="Team (2-6 Members)"
                type="radio"
                name="applyingAs"
                value="Team"
                checked={applyingAs === "Team"}
                onChange={(e) => setApplyingAs(e.target.value)}
              />
            </div>
          </Form.Group>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Startup/Idea Name *</Form.Label>
                <Form.Control type="text" placeholder="Project Title" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Domain / Sector *</Form.Label>
                <Form.Select>
                  <option>Choose...</option>
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mt-3">
            <Form.Label>Problem Statement (Max 50 words) *</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Describe the problem you are solving..." />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Solution Description *</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Describe your solution technically..." />
          </Form.Group>
        </Card.Body>
      </Card>

     
      {applyingAs === "Team" && (
        <Card className="shadow-sm mt-4">
          <Card.Header className="bg-light text-success">Team Details</Card.Header>
          <Card.Body>
            {/* Team Leader */}
            <Card className="mb-3">
              <Card.Body>
                <h6 className="text-success">Team Leader (Main Applicant)</h6>
                <Row>
                  <Col md={4}><Form.Control placeholder="Full Name" /></Col>
                  <Col md={4}><Form.Control placeholder="Email" /></Col>
                  <Col md={4}><Form.Control placeholder="Mobile" /></Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Team Members */}
            {teamMembers.map((member, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Row className="mb-2">
                    <Col md={3}><Form.Control placeholder="Full Name" value={member.fullName} onChange={(e) => handleMemberChange(index, "fullName", e.target.value)} /></Col>
                    <Col md={3}><Form.Control placeholder="Email" value={member.email} onChange={(e) => handleMemberChange(index, "email", e.target.value)} /></Col>
                    <Col md={2}><Form.Control placeholder="Mobile" value={member.mobile} onChange={(e) => handleMemberChange(index, "mobile", e.target.value)} /></Col>
                    <Col md={2}>
                      <Form.Select value={member.gender} onChange={(e) => handleMemberChange(index, "gender", e.target.value)}>
                        <option>Choose...</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Form.Select>
                    </Col>
                    <Col md={2}><Button variant="danger" size="sm" onClick={() => removeMember(index)}>Remove</Button></Col>
                  </Row>
                  <Row>
                    <Col md={4}><Form.Control placeholder="School/College Name" value={member.institution} onChange={(e) => handleMemberChange(index, "institution", e.target.value)} /></Col>
                    <Col md={4}><Form.Control placeholder="Degree/Class" value={member.degree} onChange={(e) => handleMemberChange(index, "degree", e.target.value)} /></Col>
                    <Col md={4}>
                      <Form.Select value={member.year} onChange={(e) => handleMemberChange(index, "year", e.target.value)}>
                        <option>Choose...</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                        <option>12th</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}

            <Button variant="outline-success" onClick={addMember}>+ Add Team Member</Button>
            <div className="text-muted mt-2">You can add up to 5 additional members.</div>
          </Card.Body>
        </Card>
      )}
      {/* 5. Upload Documents */}
<Card className="shadow-sm mt-4">
  <Card.Header className="bg-success text-white fw-bold">5. Upload Documents</Card.Header>
  <Card.Body>
    <Row className="mb-3">
      <Col md={3}>
        <Form.Label>Student Photo <span className="text-danger">*</span></Form.Label>
        <Form.Control type="file" accept=".jpg,.png" />
        <Form.Text className="text-muted">Max 2MB (JPG/PNG)</Form.Text>
      </Col>
      <Col md={3}>
        <Form.Label>ID Proof <span className="text-danger">*</span></Form.Label>
        <Form.Control type="file" accept=".jpg,.png,.pdf" />
        <Form.Text className="text-muted">College/School ID</Form.Text>
      </Col>
      <Col md={3}>
        <Form.Label>Bonafide Cert.</Form.Label>
        <Form.Control type="file" accept=".pdf" />
        <Form.Text className="text-muted">If available (PDF)</Form.Text>
      </Col>
      <Col md={3}>
        <Form.Label>Idea PPT/PDF <span className="text-danger">*</span></Form.Label>
        <Form.Control type="file" accept=".ppt,.pptx,.pdf" />
        <Form.Text className="text-muted">Project Abstract</Form.Text>
      </Col>
    </Row>
     </Card.Body>
</Card>


    <Form.Check 
      type="checkbox" 
      label="I hereby declare that the above information is true and correct to the best of my knowledge." 
      className="mt-3"
    />

    <div className="d-flex gap-4" style={{marginTop:'20px'}}>
      <Button variant="success">SUBMIT REGISTRATION</Button>
      <Button variant="outline-danger">Reset Form</Button>
    </div>
 

    </Container>
  );
};

export default StudentForm;
