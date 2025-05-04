"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FaDeleteLeft} from "react-icons/fa6";
 import { FaEdit } from "react-icons/fa";

const page = () => {
  const [teachers, setTeachers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/teacher");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const newTeacherHandler = async () => {
    const newTeacher = {
      name: "Marica Nicholas",
      gradeLevel: "5th Grade",
      subject: "Mathematics",
    };
    try {
      const response = await fetch("api/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });
      if (response.ok) {
        fetchTeachers();
      } else {
        throw new Error("Failed to add teacher");
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteTeacherHandler = async (id) => {
    
    const deleteID = {
      id: id
    }

    
    try {
      const response = await fetch("api/teacher", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteID),
      });
      
      if (response.ok) {
        fetchTeachers();
      } else {
        throw new Error("Failed to delete teacher");
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="flex flex-col items-center bg-slate-600 h-dvh w-dvw overflow-auto">
      <div className="flex justify-between bg-slate-600 py-2 w-3/4">
        <h1 className="text-5xl bg-slate-900 text-slate-100 text-center p-4 font-bold">
          Teachers
        </h1>
        <h2
          className="text-3xl w-48 rounded text-slate-100 bg-green-700 text-center mr-4 p-4 font-bold cursor-pointer"
          onClick={() => newTeacherHandler()}
        >
          Add New Teacher
        </h2>
      </div>

      <div className="flex flex-col items-center bg-slate-600 h-dvh w-full overflow-auto">
        <table className="w-3/4 max-w-[1200px] bg-slate-900 text-slate-100">
          <thead>
            <tr className="bg-slate-800 text-4xl">
              <th className="p-4">Name</th>
              <th className="p-4">Grade Level</th>
              <th className="p-4">Edit</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {teachers &&
              teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="bg-slate-700 even:bg-slate-800 text-2xl text-center"
                >
                  <td className="p-1 border border-slate-700 border-b-yellow-950">
                    {teacher.name}
                  </td>
                  <td className="p-1">{teacher.gradeLevel}</td>
                  <td className="p-1">
                    <FaEdit className="text-green-300 cursor-pointer w-full" />
                  </td>
                  <td className="p-1">
                    <FaDeleteLeft className="text-red-300 cursor-pointer  w-full" onClick={() => deleteTeacherHandler(teacher.id)}/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4">
          Error: {error.message}
        </div>
      )}
    </div>
  );
};

export default page;
