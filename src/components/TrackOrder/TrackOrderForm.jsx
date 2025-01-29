import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsBody,
    TabPanel,
} from "@material-tailwind/react";
import { Slide, AttentionSeeker, Fade } from "react-awesome-reveal";
import DeliveryTimeline from "./DeliveryTimeline";
import { useTrackMyOrderMutation } from "../../Features/trackOrder/trackOrderApi";
import { useDispatch } from "react-redux";
import { trackedOrderData, trackedOrderError } from "../../Features/trackOrder/trackOrderSlice";
import { CreditCardIcon, LockClosedIcon, TruckIcon } from "@heroicons/react/24/outline";


export default function TrackOrderForm() {

    const [trackingId, setTrackingId] = useState("");
    const dispatch = useDispatch();
    const [trackParsel] = useTrackMyOrderMutation();

    const handleTrackingIdChange = (event) => {
        setTrackingId(event.target.value);
    };
    const handleTrackOrder = async (e) => {
        // Handle the track order functionality here
        e.preventDefault();
        dispatch(trackedOrderError(null));
        dispatch(trackedOrderData(null));

        if (trackingId.length >= 10) {
            try {

                let response = await trackParsel(trackingId)

                if (response.error) {
                    dispatch(trackedOrderError(response.error.data));
                }
                if (response.data) {
                    dispatch(trackedOrderData(response.data))
                }

            } catch (error) {
                console.error("Error tracking order:", error);
            }
        } else {
            dispatch(trackedOrderError({ error: "Enter valid orderID or Mobile Number" }));
        }
    };

    return (
        <div className="track-order my-10 grid place-items-center mx-4 md:mx-0">
            <Card className="w-full max-w-[24rem]">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    style={{
                        background: "linear-gradient(to right, #ffb75e, #ed8f03)",
                    }}
                >
                    <Slide direction="left" delay={2000}>
                        <div className="mb-3 rounded-full border border-white/10 bg-white/10 p-4 text-white">
                            <TruckIcon  className="w-8 h-8" />
                        </div>
                    </Slide>
                    <Typography variant="h5" color="white">
                        Track Your Order
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Tabs value={"card"}>
                        <TabsBody>
                            <TabPanel value="card">
                                <form className="flex flex-col gap-4">
                                    <div className="mb-6">
                                        <Input
                                            label="Enter Order Id or Mobile Number"
                                            maxLength={20}
                                            value={trackingId}
                                            onChange={handleTrackingIdChange}
                                            icon={
                                                <CreditCardIcon strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-orange-gray-300" />
                                            }
                                        />
                                    </div>
                                    <Button
                                        size="lg"
                                        style={{
                                            backgroundImage:
                                                "radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,209,67,1) 0%, rgba(255,145,83,1) 90% )",
                                        }}
                                        type="submit"
                                        onClick={handleTrackOrder}
                                    >
                                        <AttentionSeeker effect="shake">
                                            Track My Order
                                        </AttentionSeeker>
                                    </Button>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                    >
                                        <LockClosedIcon strokeWidth={1.5} stroke="currentColor" className="-mt-0.5 h-4 w-4 capitalize" />
                                        {" "}
                                        Your Package is safe with our delivery Partner
                                    </Typography>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>


            {/* ------------------- delivery status --------------------- */}
            <DeliveryTimeline />
        </div>
    );
}
