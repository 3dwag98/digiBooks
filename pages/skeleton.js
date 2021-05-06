import { Grid, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React from "react";
import Container from "../components/Container";
import SkeletonLayout from "../components/SkeletonLayout";

function skeleton(params) {
  return (
    <Container>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {
        [...Array(4)].map((e, i) => (
          <SkeletonLayout />
        ))
        }
      </Grid>
    </Container>
  );
}

export default skeleton;
