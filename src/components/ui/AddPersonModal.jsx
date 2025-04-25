import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const AddPersonModal = ({ show, setShow, user, fetchUser }) => {
  const defaultBirthDate = "2000-01-01";
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { birth_date: defaultBirthDate },
  });

  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name || "");
      setValue("last_name", user.last_name || "");
      setValue("birth_date", user.birth_date || defaultBirthDate);
      setValue("age", user.age || "");
      setValue("address", user.address || "");
    } else {
      setValue("first_name", "");
      setValue("last_name", "");
      setValue("birth_date", defaultBirthDate);
      setValue("age", "");
      setValue("address", "");
    }
  }, [user, setValue]);

  const birthDate = watch("birthDate");
  const [age, setAge] = useState(() =>
    moment().diff(moment(defaultBirthDate, "YYYY-MM-DD"), "years")
  );

  useEffect(() => {
    if (birthDate) {
      const calculatedAge = moment().diff(
        moment(birthDate, "YYYY-MM-DD"),
        "years"
      );
      setAge(calculatedAge);
    }
  }, [birthDate]);
 
  const onSubmit = async  (data) => {
    try {
      data.birth_date = data.birth_date + "T00:00:00Z";
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}users`, data); 
      toast({
        variant: "success",
        title: "Success",
        description: "Create user successfully",
      });
      setShow(false); 
      fetchUser(); 
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Create user failed",
      });
    }
  };

  return (
    <>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{user ? "View Person" : "Add New Person"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Row 1: ชื่อ - สกุล */}
            <div className="grid grid-cols-4 items-center gap-2">
              <label className="col-span-1">ชื่อ - สกุล</label>
              <div className="col-span-1">
                <input
                  {...register("first_name", { required: true })}
                  className="border p-1 w-full"
                  placeholder="ชื่อ"
                  disabled={!!user}
                />
                {errors.first_name && (
                  <span className="text-red-500 text-sm">จำเป็นต้องกรอก</span>
                )}
              </div>
              <div className="col-span-2">
                <input
                  {...register("last_name", { required: true })}
                  className="border p-1 w-full"
                  placeholder="นามสกุล"
                  disabled={!!user}
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm">จำเป็นต้องกรอก</span>
                )}
              </div>
            </div>

            {/* Row 2: วันเกิด */}
            <div className="grid grid-cols-4 items-center gap-2">
              <label className="col-span-1">วันเกิด</label>
              <div className="col-span-1">
                <input
                  type="date"
                  {...register("birth_date", { required: true })}
                  className="border p-1 w-full"
                  disabled={!!user}
                />
                {errors.birth_date && (
                  <span className="text-red-500 text-sm">จำเป็นต้องกรอก</span>
                )}
              </div>
            </div>
            {/* Row 3: อายุ */}
            <div className="grid grid-cols-4 items-center gap-2">
              <label className="col-span-1">อายุ</label>
              <div className="col-span-1 flex items-center">
                <span className="ml-2"> {age} ปี</span>
              </div>
            </div>

            {/* Row 4: ที่อยู่ */}
            <div className="grid grid-cols-4 items-start gap-2">
              <label className="col-span-1 pt-2">ที่อยู่</label>
              <textarea
                {...register("address")}
                className="border p-1 col-span-3"
                rows="3"
                disabled={!!user}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              {!user && (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  บันทึก
                </button>
              )}
              <button
                type="button"
                onClick={() => setShow(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPersonModal;
