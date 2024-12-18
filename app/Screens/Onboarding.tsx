import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";

const { width, height } = Dimensions.get("window");

type SlideProps = {
  id: number;
  title: string;
  image: string;
  body: string;
};
const slides = [
  {
    id: 1,
    title: "Discover Organisations",
    image:
      "https://res.cloudinary.com/dpokiomqq/image/upload/v1734526854/amico_rzkdak.png",
    body: "Easily find and connect with a wide range of organizations. Browse through their details and choose the best time to visit.",
  },
  {
    id: 2,
    title: "Real-Time Waitlist",
    image:
      "https://res.cloudinary.com/dpokiomqq/image/upload/v1734526888/cuate_epiyzw.png",
    body: "See current wait times and your position in line at a glance. Stay updated and plan your visit more efficiently.",
  },
  {
    id: 3,
    title: "Easy Booking",
    image:
      "https://res.cloudinary.com/dpokiomqq/image/upload/v1734526870/rafiki_txwnwm.png",
    body: "Schedule your visits in advance and avoid long waits. Select a convenient time slot and book your appointment seamlessly.",
  },
];

const Slide = ({
  item,
  translateX,
  index,
}: {
  item: SlideProps;
  translateX: Animated.Value;
  index: number;
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const scale = translateX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  const opacity = translateX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: [{ scale }],
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ height: "65%", width, resizeMode: "contain" }}
      />
      <View className="w-[350px] pt-[20px] gap-5">
        <Text className="text-center font-bold text-[26px] text-black">
          {item.title}
        </Text>
        <Text className="text-center text-[#3D3D3D] text-[14px]">
          {item.body}
        </Text>
      </View>
    </Animated.View>
  );
};

const Onboarding = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const ref = useRef<FlatList<SlideProps>>(null);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      let nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex >= slides.length) {
        nextSlideIndex = 0; // Go back to the first slide
      }
      const offset = nextSlideIndex * width;
      if (ref.current) {
        ref.current.scrollToOffset({ offset });
      }
      setCurrentSlideIndex(nextSlideIndex);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoScroll); // Cleanup interval on unmount
  }, [currentSlideIndex]);

  const updatedCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            gap: 10,
          }}
        >
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotColor = translateX.interpolate({
              inputRange,
              outputRange: ["#F0ECF8", "#9747FF", "#F0ECF8"],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
        <View>
          <Button
            text="Get Started"
            onPress={() => navigation.replace("HomeScreen")}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={"white"} />
      <View className="flex-1 items-end p-4">
        <TouchableOpacity
          onPress={() => navigation.replace("HomeScreen")}
          className="bg-[#F0ECF8] text-black h-[30px] rounded-full w-[63px] items-center justify-center"
        >
          <Text> Skip </Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={slides}
        ref={ref}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: translateX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={updatedCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.55 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => (
          <Slide item={item} index={index} translateX={translateX} />
        )}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default Onboarding;
